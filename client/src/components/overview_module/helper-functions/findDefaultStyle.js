/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const findDefaultStyle = (styles) => {
  console.log(styles);
  for (let i = 0; i < styles.length; i++) {
    if (styles[i]['default?']) {
      return styles[i];
    }
  }
};

export default findDefaultStyle;
