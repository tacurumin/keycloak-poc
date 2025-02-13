import styled from "styled-components";

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
  //margin-bottom: 0.5rem;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }

  &.secondary {
    background-color: #fff;
    color: #17596f;
    margin-top: 0;
    margin-bottom: 0.5rem;

    &:hover {
      filter: brightness(0.95);
    }
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

  &.secondary {
    border: 3px solid #17596f;
    border-bottom: 3px solid transparent;
    border-radius: 100%;
    animation: spin 600ms linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
