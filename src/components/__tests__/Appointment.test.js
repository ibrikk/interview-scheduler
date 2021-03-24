import React from 'react';
import Application from '../Appointment/index';
import { render } from '@testing-library/react';

describe('Appointment', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', () => {
    render(<Application />);
  });
});
