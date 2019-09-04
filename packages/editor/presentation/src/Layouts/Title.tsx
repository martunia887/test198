import * as React from 'react';
import styled from 'styled-components';
import { Slide, Layout, Fill, Heading } from 'spectacle';
import Avatar from '@atlaskit/avatar';
// import { ReactSerializer } from '@atlaskit/renderer';
// import { Slide as SlideADF } from '../utils/convertADFToSlides';
// import { HeadingSlide } from '../utils/transformers/heading';
// import { Heading } from '../ui';

const AMAZING_USERS = [
  {
    email: 'rvieira@atlassian.com',
    name: 'Rodrigo Vieira',
    src: 'https://staff-avatars.prod.atl-paas.net/avatar/rvieira?size=Large',
  },
  {
    email: 'jquintana@atlassian.com',
    name: 'Jesús Quintana',
    src: 'https://staff-avatars.prod.atl-paas.net/avatar/jquintana?size=Large',
  },
  {
    email: 'jrotanson@atlassian.com',
    name: 'James Rotanson',
    src: 'https://staff-avatars.prod.atl-paas.net/avatar/jrotanson?size=Large',
  },
];

const AvatarPlace = styled.figure`
  display: flex;
  justify-content: space-around;
  margin-top: 4rem;
  align-items: center;
`;

const AvatarDetails = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  title: string;
}

class Title extends React.Component<Props> {
  render() {
    const { title } = this.props;

    return (
      <Slide transition={['slide']} {...this.props}>
        <Layout>
          <Fill>
            <Heading className="ak-presentationmode__page-title">
              {title}
            </Heading>

            <AvatarPlace className="ak-presentationmode__author-name">
              {AMAZING_USERS.map((a, index) => (
                <AvatarDetails key={index}>
                  <Avatar
                    enableTooltip={false}
                    name="xxlarge"
                    size="xlarge"
                    src={a.src}
                  />
                  <small>{a.name}</small>
                </AvatarDetails>
              ))}
            </AvatarPlace>
          </Fill>
        </Layout>
      </Slide>
    );
  }
}

export default Title;
