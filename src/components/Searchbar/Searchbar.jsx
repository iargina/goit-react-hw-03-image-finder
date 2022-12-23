import { Component } from 'react';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    text: ``,
  };

  onChange = event => {
    this.setState({ text: event.target.value });
  };

  onSubmit = ev => {
    ev.preventDefault();
    if (!this.state.text) return;
    this.props.onSubmit({ ...this.state });
    this.setState({ text: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
          <input
            className={css.serchInput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
          />
          <button type="submit" className={css.searchButton}>
            &#128269;
          </button>
        </form>
      </header>
    );
  }
}
