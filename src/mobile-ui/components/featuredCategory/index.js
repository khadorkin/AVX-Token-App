/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */

import React from 'react';
// import ReactDOM from 'react-dom';
import { StateComponent } from 'components/react';
import styled from 'styled-components';
import FileCard from 'components/fileCard';
// import { ToolTip } from 'components/tooltip';
import Link from 'components/link';
import { normalizeURI } from 'utils/lbryURI';
import theme from 'theme';

import { View, Text, Platform } from 'components/core';

// const paddingTopCardHoverHack = 20;
// const paddingRightCardHoverHack = 30;

const CardRowHeader = Link.extend`
  margin-top: ${theme.spacingVertical}px;
  margin-bottom: ${theme.spacingVertical / 4}px;
  margin-left: ${theme.fontSize}px;
`;

const HeaderSpan = styled(Text)`
  margin-top: 4px;
  ${theme.heading1};
`;

const osCardRowScrollhouseWeb = `
  flex-direction: row;
  align-items: flex-start;
`;
const osCardRowScrollhouseNative = `
  flex-direction: column;
  align-items: center;
`;
const CardRowScrollhouse = styled(View)`
  position: relative;
  justify-content: flex-start;
  padding: 0px ${theme.card.margin / 2}px;
  ${Platform.OS === 'web' ? osCardRowScrollhouseWeb : osCardRowScrollhouseNative};
`;

// const CardRowNav = styled(View)`
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 0 ${theme.card.margin}px;
//   height: 100%;
//   ${props => props.align}: 0;
//   width: 0px;
//   z-index: 2;
// `;

/*color: ${theme.colorHelp};
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ${theme.animationStyle};*/
// const CardRowScrollButton = styled(TouchableHighlight)`
//   background: ${theme.card.bg};
//   box-shadow: ${theme.shadow.layer};
//   padding: ${theme.spacingVertical / 4}px ${theme.spacingVertical / 10}px;
//   position: absolute;
//   ${props => props.align}: -${theme.spacingVertical}px;
//   top: -${theme.spacingVertical * 0.8}px;
//   opacity: 0.8;

//   &:hover {
//     opacity: 1;
//     transform: scale(calc(var(--card-link-scaling) * 1.1));
//   }
// `;

// const CardRowItems = styled(View)`
//   width: 100%;
//   overflow: hidden;
//   flex-direction: row;
//   align-items: stretch;
// `;
// /*hacky way to give space for hover */
// padding-top: ${paddingTopCardHoverHack}px;
// margin-top: -1 * ${paddingTopCardHoverHack}px;
// padding-right: ${paddingRightCardHoverHack};
// margin-right: -1 * ${paddingRightCardHoverHack};

// const StyledFileCard = FileCard;
// styled(FileCard)`
//   align-self: flex-start;
//   overflow: hidden;
// `;

export default class FeaturedCategory extends StateComponent {
  constructor() {
    super();

    this.state = {
      numItems: undefined,
      canScrollPrevious: false,
      canScrollNext: false,
    };
  }

  componentWillMount() {
    this.setState({
      numItems: this.props.names.length,
    });
  }

  // componentDidMount() {
  //   const cardRow = ReactDOM.findDOMNode(this.refs.rowitems);
  //   if (!cardRow || !cardRow.getElementsByTagName) return;
  //   const cards = cardRow.getElementsByTagName('section');

  //   // check if the last card is visible
  //   const lastCard = cards[cards.length - 1];
  //   const isCompletelyVisible = this.isCardVisible(lastCard, cardRow, false);

  //   if (!isCompletelyVisible) {
  //     this.setState({
  //       canScrollNext: true,
  //     });
  //   }
  // }

  // handleScrollPrevious = () => {
  //   const cardRow = ReactDOM.findDOMNode(this.refs.rowitems);
  //   if (!cardRow || !cardRow.getElementsByTagName) return;
  //   if (cardRow.scrollLeft > 0) {
  //     // check the visible cards
  //     const cards = cardRow.getElementsByTagName('section');
  //     let firstVisibleCard = null;
  //     let firstVisibleIdx = -1;
  //     for (let i = 0; i < cards.length; i++) {
  //       if (this.isCardVisible(cards[i], cardRow, false)) {
  //         firstVisibleCard = cards[i];
  //         firstVisibleIdx = i;
  //         break;
  //       }
  //     }

  //     const numDisplayed = this.numDisplayedCards(cardRow);
  //     const scrollToIdx = firstVisibleIdx - numDisplayed;
  //     const animationCallback = () => {
  //       this.setState({
  //         canScrollPrevious: cardRow.scrollLeft !== 0,
  //         canScrollNext: true,
  //       });
  //     };
  //     this.scrollCardItemsLeftAnimated(
  //       cardRow,
  //       scrollToIdx < 0 ? 0 : cards[scrollToIdx].offsetLeft,
  //       100,
  //       animationCallback
  //     );
  //   }
  // };

  // handleScrollNext = () => {
  //   const cardRow = ReactDOM.findDOMNode(this.refs.rowitems);
  //   if (!cardRow || !cardRow.getElementsByTagName) return;

  //   // check the visible cards
  //   const cards = cardRow.getElementsByTagName('section');
  //   let lastVisibleCard = null;
  //   let lastVisibleIdx = -1;
  //   for (let i = 0; i < cards.length; i++) {
  //     if (this.isCardVisible(cards[i], cardRow, true)) {
  //       lastVisibleCard = cards[i];
  //       lastVisibleIdx = i;
  //     }
  //   }

  //   if (lastVisibleCard) {
  //     const numDisplayed = this.numDisplayedCards(cardRow);
  //     const animationCallback = () => {
  //       // update last visible index after scroll
  //       for (let i = 0; i < cards.length; i++) {
  //         if (this.isCardVisible(cards[i], cardRow, true)) {
  //           lastVisibleIdx = i;
  //         }
  //       }

  //       this.setState({ canScrollPrevious: true });
  //       if (lastVisibleIdx === cards.length - 1) {
  //         this.setState({ canScrollNext: false });
  //       }
  //     };

  //     this.scrollCardItemsLeftAnimated(
  //       cardRow,
  //       Math.min(lastVisibleCard.offsetLeft, cardRow.scrollWidth - cardRow.clientWidth),
  //       100,
  //       animationCallback
  //     );
  //   }
  // };

  // scrollCardItemsLeftAnimated(cardRow, target, duration, callback) {
  //   if (!duration || duration <= diff) {
  //     cardRow.scrollLeft = target;
  //     if (callback) {
  //       callback();
  //     }
  //     return;
  //   }

  //   const component = this;
  //   const diff = target - cardRow.scrollLeft;
  //   const tick = diff / duration * 10;
  //   setTimeout(() => {
  //     cardRow.scrollLeft += tick;
  //     if (cardRow.scrollLeft === target) {
  //       if (callback) {
  //         callback();
  //       }
  //       return;
  //     }
  //     component.scrollCardItemsLeftAnimated(cardRow, target, duration - 10, callback);
  //   }, 10);
  // }

  // eslint-disable-next-line class-methods-use-this
  isCardVisible(section, cardRow, partialVisibility) {
    if (!section) {
      return false;
    }
    // check if a card is fully or partialy visible in its parent
    const cardRowWidth = cardRow.offsetWidth;
    const cardRowLeft = cardRow.scrollLeft;
    // const cardRowEnd = cardRowLeft + cardRow.offsetWidth;
    const sectionLeft = section.offsetLeft - cardRowLeft;
    const sectionEnd = sectionLeft + section.offsetWidth;

    return (
      (sectionLeft >= 0 && sectionEnd <= cardRowWidth) ||
      (((sectionLeft < 0 && sectionEnd > 0) || (sectionLeft > 0 && sectionLeft <= cardRowWidth)) &&
        partialVisibility)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  numDisplayedCards(cardRow) {
    const cards = cardRow.getElementsByTagName('section');
    const cardRowWidth = cardRow.offsetWidth;
    // get the width of the first card and then calculate
    const cardWidth = cards.length > 0 ? cards[0].offsetWidth : 0;

    if (cardWidth > 0) {
      return Math.ceil(cardRowWidth / cardWidth);
    }

    // return a default value of 1 card displayed if the card width couldn't be determined
    return 1;
  }

  render() {
    const { category, names = [] } = this.props;

    const limitedNames = names.slice(0, Platform.OS === 'web' ? 5 : 3);

    // TODO: header links for full categories
    return [
      <CardRowHeader key="header" className="button-text no-underline" to="/">
        <HeaderSpan>{category}</HeaderSpan>
      </CardRowHeader>,
      <CardRowScrollhouse key="items">
        {/*
        {this.state.canScrollPrevious && (
          <CardRowNav align="left" key="left">
            <CardRowScrollButton align="right" onClick={this.handleScrollPrevious}>
              <Icon icon="chevron-left" />
            </CardRowScrollButton>
          </CardRowNav>
        )}
        {this.state.canScrollNext && (
          <CardRowNav align="right" key="right">
            <CardRowScrollButton align="left" onClick={this.handleScrollNext}>
              <Icon icon="chevron-right" />
            </CardRowScrollButton>
          </CardRowNav>
        )}
      */}
        {limitedNames.map(name => (
          <FileCard key={name} displayStyle="card" uri={normalizeURI(name)} />
        ))}
      </CardRowScrollhouse>,
    ];
  }
}
