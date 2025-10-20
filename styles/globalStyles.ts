'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${props => props.theme.fonts.main};
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.secondary};
    line-height: 1.5;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.fontWeights.semibold};
    line-height: 1.2;
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    transition: all 0.2s ease;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.textLight};
  }
`;

