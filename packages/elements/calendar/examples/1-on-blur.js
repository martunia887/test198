// @flow

import React from 'react';
import { CalendarStateless } from '../src';
import { action } from './_';

module.exports = () => <CalendarStateless onBlur={action('blur')} />;
