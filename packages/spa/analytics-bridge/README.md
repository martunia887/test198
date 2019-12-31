This package is a bridge between Atlaskit's analytics and Analytics web client that provides
utilities that transform raw Atlaskit analytics format into the GasV3 compatible event.

There are only two general concepts that you need to send consistent analytics: how to fire an
event, how to provide contextual data to the event, and what belongs where. This client simplifies
GasV3 analytics experience by drawing very clear and strict line between those concepts.

## General concepts

### Firing an event: active

The act of firing an event is active and fluid, it happens at exactly the same time and place where
some action happened that needs to be analysed:

- a button was clicked
- a modal dialog was mounted
- a fetch request succeeded/failed

etc.

Data that you send with this event always derived from this particular action and relevant only to
it, for example:

- the fact that it was button that was clicked
- error number from the failed response
- index of a cell in a table that was clicked

etc.

In GasV3 client the only data that is relevant to this particular action is:

- action (clicked, created, submitted, etc)
- actionSubject (button, dialog, issue, etc)
- actionSubjectId (submitButton, createIssueLink, etc)
- attributes - an object with the data that is relevant to that action ({ cellNumber: 5 })

Everything else is contextual data

### Describing contextual data: passive

While firing an event is active, describing context in which this event happened is passive and
static. You define it once and then different analytics events that originated in that context will
get all the data from it. Typical examples of context would be: screens, containers, tags and all
other GasV3 properties.

## Implementation

### Contextual data

There is only one way to define context of your analytics: via `ContextualAnalyticsData` component.

```
import { ContextualAnalyticsData, INLINE_DIALOG } from '@atlassian/jira-product-analytics-bridge';

const MyAwesomeComponent = () => {
  return <ContextualAnalyticsData attributes={{ some: 'data' }} sourceType={INLINE_DIALOG} sourceName={"myAwesomeThing"}>
    ...
    // component render goes here
    ...
  </ContextualAnalyticsData>
}
```

It accepts following props:

```
type SourceTypes =
    | typeof SCREEN
    | typeof DRAWER
    | typeof MODAL
    | typeof INLINE_DIALOG
    | typeof DROPDOWN
{
    +containerId?: string,
    +containerType?: string,
    +objectType?: string,
    +objectId?: string,
    +tags?: string[],
    +sourceName?: string,
    +sourceType?: SourceTypes,
    +attributes?: { [string]: any },
}
```

where `sourceType` can only accept following values that are exported as constants from this
library:

```
DRAWER, DROPDOWN, INLINE_DIALOG, MODAL, SCREEN
```

### Event firing

GasV3 provides us with 4 types of events that can be fired: screen, UI, track and operational. For
every type of event this library exports two ways to fire it: imperative and declarative.

#### Imperative

Available functions:

```
fireOperationalAnalytics,
fireScreenAnalytics,
fireTrackAnalytics,
fireUIAnalytics
```

Use those when you need to fire an event outside of the render function

All of them have exactly the same signature and transformations underneath.

**Full format:**

```
fireUIAnalytics(event, eventName, componentName, attributes);
```

`eventName` is just syntax sugar for the combination of GasV3 `actionSubject action` and will be
transpiled into those

`componentName` is just syntax sugar for GasV3 `actionSubjectId`

Typical usage example would be:

```
fireUIAnalytics(event, 'card clicked', 'createIssueCard', { index: 1 });
fireTrackAnalytics(event, 'issue created', '123', { some: 'thing' });
```

**Shortened format:** Every function attribute is optional, the only requirement is that they are in
the same order.

For example, all events that are provided by intrumented Atlaskit components already have `action`
and `actionSubject` for you, so you don't need to specify them (read more about instrumentation of
Atlaskit components here: https://atlaskit.atlassian.com/packages/core/analytics-next.

---

Please note, that Atlaskit's raw format is not supported by GasV3 spec and is incompatible with
Jira's event listeners, we need this bridge library to align them. You can not use raw
`event.fire()` or raw `AnalyticsContext` from Atlaskit when instrumenting your events in Jira

---

```
fireUIAnalytics(event, 'submitFeedbackButton', { some: 'thing' });
```

Or, if there are no attributes that you need to fire with this event

```
fireUIAnalytics(event, 'submitFeedbackButton');
```

Or, for screen events that don't have a concept of `actionSubjectId` you can fire it like this

```
fireScreenAnalytics(event);
```

or with attributes

```
fireScreenAnalytics(event, { some: 'thing' });
```

**Example**

```
import Button from '@atlaskit/button';

const MyAwesomeComponent = () => (
    <Button
        onClick={(event, analyticsEvent) => {
            fireUIAnalytics(analyticsEvent);
        }}
    />
);
```

#### Declarative

Available components:

```
FireOperationalAnalytics,
FireScreenAnalytics,
FireTrackAnalytics,
FireUIAnalytics
```

Same as with imperative call, those components have exactly the same API between them.

**Full format:**

```
<FireUIAnalytics eventName={'card clicked'} componentName={'createIssueCard'} attributes={{ index: 1 }} />
```

`eventName` is just syntax sugar for the combination of GasV3 `actionSubject action` and will be
transpiled into those `componentName` is just syntax sugar for GasV3 `actionSubjectId`

You can pass those directly instead if there is a need for it

```
<FireUIAnalytics actionSubject="card" action="clicked" actionSubject="createIssueCard" attributes={{ index: 1 }} />
```

This format is useful when you need to fire an event when a component mounted, like most of the
screen events or track events in services

**Example**

Fire a simple track event when an issue is created

```
const MyAwesomeComponent = () => (
    <MyAwesomeService>
        {({ loading, data }) => {
            if (loading) return '...';

            if (data) {
                return <FireTrackEvent eventName="issue created" />;
            }
        }}
    </MyAwesomeService>
);
```

Fire a screen event when a page is mounted

```
const MyAwesomeComponent = () => (
    <MyAwesomePage>
        <FireScreenEvent />;
    </MyAwesomePage>
);
```

Exactly the same API is for operational and UI events.

### Getting access to events

#### From Atlaskit components

As you noticed from the examples above, in order to use imperative method we need to pass analytics
event as a first argument to the function. Most of the time this event will be provided from
Atlaskit components, most of the core components are intrumented with analytics and have this event
as a last argument of their callbacks.

For example, `onClick` prop of Button component will provide you with analytics event as a second
argument (the first one will be native button event). This event already comes with action and
actionSubject baked in, please use events from Atlaskit component whenever possible in order to
achieve consistency in analytic data

**Example**

```
import Button from '@atlaskit/button';

const MyAwesomeComponent = () => (
    <Button
        onClick={(event, analyticsEvent) => {
            fireUIAnalytics(analyticsEvent);
        }}
    />
);
```

#### From MountEvent util component

When there is no access to Atlaskit UI components or a component is not instrumented for some
reason, you can get this event from a helpful utility component `MountEvent` provided by this
library. The only thing it does is when mounted it injects analyticsEvent to the onMount property
that you can use to fire events imperatively.

**Example**

```
const doSomething = (analyticsEvent) => {
  // some logic depending on which you want to fire your event

  fireTrackEvent(analyticsEvent, 'something created');
}

const MyAwesomeComponent = () => (
    <SomeThings>
        <MountEvent onMount={analyticsEvent => doSomething(analyticsEvent)}
    </SomeThings>
);
```

#### From AnalyticsEventToProps (for shareable components)

When there is a need to create some shareable component for others to consume within Jira you can
use the `AnalyticsEventToProps` wrapper that will inject an analytics event as the last argument of
the callbacks you pass to it.

For example, this code will inject analytics events into the `onClick` and `onPressed` props and
pre-fill the action and actionSubject for you

```
const MyAwesomeComponentWithAnalytics = AnalyticsEventToProps('myButton', {
    onClick: 'clicked',
    onPressed: 'pressed'

})(MyButton)
```

So the usage of this component and firing events from it will be exactly the same as with any
Atlaskit components

```
render () {
  return <MyAwesomeComponentWithAnalytics onClick={(event, analyticsEvent) => fireUIAnalytics(analyticsEvent, 'submitButton')} />
}
```

#### Manually

If everything else failed you can use Atlaskit's manual way of creating analytics:
https://atlaskit.atlassian.com/packages/core/analytics-next/docs/concepts#passing-an-event-to-your-consumers

Use it only to create events that you want to pass to external consumers of your component and don't
forget that you can not use Atlaskit's raw `event.fire()`, it will be incompatible with GasV3 spec
and Jira's event listeners.

You'd need to manually pass not only "action", but "actionSubject" as well for it.
