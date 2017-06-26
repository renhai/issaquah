import React from 'react';
import { connect } from 'react-redux';
import { changeLocale } from '../actions/locales';

const stateToProps = state => ({
  locales: state.locale.locales,
  locale: state.locale.locale,
});

const actionToProps = {
  onChange: changeLocale,
};

@connect(stateToProps, actionToProps)
export default class ChangeLocale extends React.Component {
  props: {
    locales: any,
    locale: string,
    onChange: (locale: string) => void
  };

  handleChange = (event) => {
    event.preventDefault();
    const locale = event.target.value;
    this.props.onChange(locale);
  };

  render() {
    const { locales, locale } = this.props;

    return (
      <span className="control has-addons">
        <span className="select">
          <select name="locale" value={locale} onChange={this.handleChange}>
            {Object.keys(locales).map((each, key) =>
              <option value={each} key={key}>{locales[each]}</option>,
            )}
          </select>
        </span>
      </span>
    );
  }
}
