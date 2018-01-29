import PropTypes from 'prop-types';

export const Action = {
  action: PropTypes.string,
};

export const Element = PropTypes.element;

export const Style = PropTypes.any;

export const LayoutEvent = {
  nativeEvent: {
    layout: {
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    },
  },
};
