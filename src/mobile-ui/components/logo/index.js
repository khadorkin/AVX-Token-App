import React from 'react';
import PropTypes from 'prop-types';
import theme from 'theme';

export default class IconLogo extends React.PureComponent {
  static propTypes = {
    label: PropTypes.bool,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    icon: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    label: false,
    primaryColor: '#3BBCE9',
    secondaryColor: theme.defaultTextColor,
    icon: {},
  };

  renderLabel() {
    return (
      <g id="XMLID_48_">
        <path
          id="XMLID_54_"
          className="st0"
          d="M215.6,46.8h24.3l30.1,96h-20l-6.1-20.1h-32.7l-6,20.1h-19.7L215.6,46.8z M239.4,105.5l-11.8-42.2l-11.8,42.2H239.4z"
        />
        <path
          id="XMLID_57_"
          className="st0"
          d="M269.9,46.8h19.9l22.4,75.3l22.4-75.3h19.7l-30.1,96H300L269.9,46.8z"
        />
        <path
          id="XMLID_59_"
          className="st0"
          d="M410.5,95.7l29.5,47.1h-21.3l-20-31.9l-18.3,31.9h-21.3l29.6-48.1l-30-47.9H380l20.5,32.8l18.7-32.8h21.2L410.5,95.7z"
        />
        <path
          id="XMLID_61_"
          className="st1"
          d="M473.2,58.9h-28.5V47.2h70.2v11.7h-28.5v84h-13.1V58.9z"
        />
        <path
          id="XMLID_63_"
          className="st1"
          d="M530.2,140.5c-4.4-2.1-7.7-5.7-9.8-10.8c-2.1-5.1-3.2-12.3-3.2-21.6c0-9.5,1.1-16.8,3.2-22c2.2-5.1,5.4-8.7,9.8-10.6c4.4-1.9,10.2-2.9,17.6-2.9c7.4,0,13.2,1,17.6,3c4.4,2,7.6,5.6,9.8,10.7c2.2,5.1,3.2,12.4,3.2,21.9c0,9.3-1.1,16.6-3.2,21.7c-2.1,5.1-5.4,8.7-9.7,10.8c-4.4,2-10.3,3-17.7,3C540.5,143.6,534.6,142.6,530.2,140.5z M558,131.2c2.5-1.2,4.3-3.5,5.6-7.1c1.3-3.6,1.9-9,1.9-16.2c0-7.2-0.6-12.6-1.9-16.2c-1.3-3.6-3.1-5.9-5.6-7.1c-2.5-1.1-5.9-1.7-10.2-1.7c-4.4,0-7.8,0.6-10.2,1.7c-2.4,1.1-4.2,3.5-5.5,7.1c-1.3,3.6-1.9,9-1.9,16.2c0,7.3,0.6,12.7,1.9,16.3c1.3,3.6,3.1,5.9,5.5,7.1c2.4,1.1,5.8,1.7,10.2,1.7C552.1,133,555.5,132.4,558,131.2z"
        />
        <path
          id="XMLID_66_"
          className="st1"
          d="M594.3,43.8h13V100h9.5L636,73.4h13.5l-23.2,32.4l24.9,37h-13.5l-21.4-31.1h-9.1v31.1h-13V43.8z"
        />
        <path
          id="XMLID_68_"
          className="st1"
          d="M671.5,140.4c-4.3-2.2-7.4-5.8-9.2-10.9c-1.9-5.1-2.8-12.2-2.8-21.4c0-9.3,0.9-16.6,2.8-21.7c1.9-5.1,4.9-8.7,9.1-10.8c4.2-2.1,10.1-3.1,17.6-3.1c6.6,0,11.8,0.7,15.7,2.1c3.9,1.4,6.7,3.8,8.6,7.1s2.7,8,2.7,14c0,6.1-1.8,10.6-5.3,13.3c-3.5,2.7-8.7,4.1-15.3,4.1h-23c0.1,5.3,0.7,9.4,1.8,12.3c1.1,2.9,3,5,5.9,6.3c2.9,1.3,7,1.9,12.3,1.9h21.7v7.8c-4.8,0.7-9,1.2-12.6,1.6c-3.6,0.4-7.7,0.6-12.3,0.6C681.7,143.6,675.8,142.5,671.5,140.4z M694.3,104.9c3.5,0,6.1-0.7,7.7-2c1.6-1.3,2.4-3.7,2.4-7.1c0-5.2-1.1-8.8-3.4-10.8c-2.3-2-6.3-3-11.9-3c-4.4,0-7.8,0.6-10.2,1.9c-2.4,1.3-4.1,3.6-5.1,6.8c-1,3.2-1.5,7.9-1.5,14.1H694.3z"
        />
        <path
          id="XMLID_71_"
          className="st1"
          d="M731.9,73.4h10.4l2.6,7.5c3.4-2.5,7.2-4.6,11.5-6.2c4.3-1.6,8.6-2.5,12.9-2.5c7.4,0,12.8,2.2,16.2,6.7c3.5,4.5,5.2,10.2,5.2,17.2v46.7h-13V97.7c0-4.2-1.2-7.5-3.5-9.9s-5.5-3.7-9.6-3.7c-3.6,0-6.9,0.5-9.9,1.6c-3,1-6.3,2.6-9.8,4.7v52.6h-13V73.4z"
        />
      </g>
    );
  }

  render() {
    const { props: { label = false, primaryColor, secondaryColor, icon, ...svgProps } } = this;
    const viewBox = label ? '0 0 792 182.6' : '0 0 182.6 182.6';
    //         style="enable-background:new 0 0 792 182.6;"
    return (
      <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox={viewBox} {...svgProps}>
        <style type="text/css">
          .st0{`{fill:${secondaryColor};}`}
          .st1{`{fill:${primaryColor};}`}
        </style>
        {label ? this.renderLabel() : null}
        <g id="XMLID_1356_" {...icon}>
          <g id="XMLID_111_">
            <path
              id="XMLID_115_"
              className="st1"
              d="M144.8,82.6l-10.2-6.4c0.4,4.9,0.7,9.9,0.7,14.9c0,5.2-0.2,10.3-0.7,15.2l10.2-6.4C151.2,95.9,151.2,86.6,144.8,82.6z"
            />
            <path
              id="XMLID_114_"
              className="st1"
              d="M100.7,91.1c0,13.8-1.5,27-4.4,39.2l19-11.9c1.5-8.7,2.4-17.9,2.4-27.3c0-9.3-0.8-18.4-2.4-27l-19-11.9C99.1,64.4,100.7,77.5,100.7,91.1z"
            />
            <path
              id="XMLID_113_"
              className="st1"
              d="M19.6,4.1l-4-2.5C6.9-3.9-3.5,5.7,1.2,14.9c24.1,47.8,24.1,104.8,0,152.7c-4.7,9.3,5.7,18.8,14.5,13.3l3.3-2c16.1-18.4,27-51.4,27-87.8C45.9,55.1,35.3,22.6,19.6,4.1z"
            />
            <path
              id="XMLID_112_"
              className="st1"
              d="M73.4,37.8L49.7,23c7.9,19.2,12.5,42.7,12.5,68.1c0,25.6-4.7,49.2-12.8,68.6l24-15.1c6.1-15.6,9.6-34,9.6-53.5C83.1,71.8,79.5,53.5,73.4,37.8z"
            />
          </g>
        </g>
      </svg>
    );
  }
}
