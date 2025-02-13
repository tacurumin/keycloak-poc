import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;

  label {
    color: #111827;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
  }
  input[type="text"],
  input[type="password"] {
    color: #3e3446;
    border: 1px solid #cbd5e1;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 0.25rem;
    height: 2.5rem;
    outline: none;
    transition: 100ms all ease-in-out;

    &:focus-visible {
      border: 2px solid #0284c7 !important;
    }
  }

  .error {
    border: 1px solid #cd0000 !important;
  }

  .icon {
    position: absolute;
    bottom: 0.7rem;
    color: #111827;
    right: 0.5rem;
    transition: 150ms all;
    cursor: pointer;

    &:hover {
      background-color: #e4e4e4;
      border-radius: 100%;
    }
  }
`;
