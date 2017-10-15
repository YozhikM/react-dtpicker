/* @flow */

import React from 'react';
import Calendar from '../Calendar';

describe('Calendar', () => {
    describe('render()', () => {
        it('basic', () => {
            const wrapper = shallow( < Calendar / > );
            wrapper.setState({
                value: new Date(2009, 4)
            });
            wrapper.setState({
                highlight: new Date(2009, 3, 4)
            });
            wrapper.setState({
                isSingleCalendar: true
            })
            expect(wrapper).toMatchSnapshot()
        });

        it('!isSingleCalendar', () => {
            const wrapper = shallow( < Calendar / > );
            wrapper.setState({
                value: new Date(2009, 4)
            });
            wrapper.setState({
                highlight: [new Date(2009, 3, 4), new Date(2009, 3, 6)]
            });
            expect(wrapper).toMatchSnapshot()
        });
    });

    describe('componentWillMount()', () => {
        it('!isSingleCalendar', () => {
            const wrapper = shallow( < Calendar / > );
            wrapper.setState({
                value: new Date(2009, 4)
            });
            wrapper.setState({
                highlight: new Date(2009, 3, 4)
            });
            wrapper.setState({
                isSingleCalendar: true
            })
            expect(wrapper).toMatchSnapshot()
        });

        it('!isSingleCalendar', () => {
            const wrapper = shallow( < Calendar / > );
            wrapper.setState({
                value: new Date(2009, 4)
            });
            wrapper.setState({
                highlight: [new Date(2009, 3, 4), new Date(2009, 3, 6)]
            });
            expect(wrapper).toMatchSnapshot()
        });
    });
});
