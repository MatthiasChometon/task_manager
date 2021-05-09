import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle<{ theme: any }>`
  a {
    color: ${({ theme }) => theme.main_color};
    transition: all 0.50s linear;
  }
  .footer {
    background-color: ${({ theme }) => theme.main_color};
    transition: all 0.50s linear;
  }
  .btn {
    background-color: ${({ theme }) => theme.main_color} !important;
    border-color: ${({ theme }) => theme.main_color};
    transition: all 0.50s linear;
  }
  .btn: hover {
    background-color: ${({ theme }) => theme.hover_color};
    border-color: ${({ theme }) => theme.hover_color};
    transition: all 0.50s linear;
  }
  .button: focus {
    background-color: ${({ theme }) => theme.hover_color};
    border-color: ${({ theme }) => theme.hover_color};
    transition: all 0.50s linear;
  }
  .button: active {
    background-color: ${({ theme }) => theme.hover_color};
    border-color: ${({ theme }) => theme.hover_color};
    transition: all 0.50s linear;
  }
  `
