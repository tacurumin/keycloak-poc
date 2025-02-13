import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  background-color: #fff;
  border-radius: 0.5rem;
  gap: 0.5rem;

  h1 {
    color: #020617;
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 2.25rem;
    text-align: center;
  }

  h2 {
    color: #020617;
    font-size: 1rem;
    line-height: 1.5rem;
    text-align: center;
    font-weight: 400;
  }
`;

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

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #17596f;
  color: #fff;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  transition: 100ms all;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.25rem;
  gap: 1rem;

  p {
    text-align: center;
  }
`;

export const Spinner = styled.span`
  width: 20px;
  height: 20px;
  display: block;
  border: 3px solid #fff;
  border-bottom: 3px solid transparent;
  border-radius: 100%;
  animation: spin 600ms linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Divider = styled.span`
  display: block;
  height: 1px;
  width: 100%;
  background-color: #e4e4e4;
  margin: 0.5rem 0;
`;

export const SignupSteps = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 60px;
  max-height: 60px;
  //background-color: #000;
  margin-top: 1rem;

  .steps-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #e4e4e4;
    transition: 200ms all;
    background-color: #fff;
    color: #111827;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem;

    &:hover {
      filter: brightness(0.95);
    }
  }

  .radius-left {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .radius-right {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  .active {
    color: #fff;
    background-color: #111827;
  }
`;
