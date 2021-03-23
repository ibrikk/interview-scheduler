import React from 'react';
import Application from '../Appointment/index';
import { render } from '@testing-library/react';

describe('Appointment', () => {
it('render without crashing', () => {
  render(<Application />);
});
});

