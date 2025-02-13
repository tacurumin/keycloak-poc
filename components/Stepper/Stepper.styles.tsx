import styled from "styled-components";
type Props = {
  $actualStep: number;
  $lastStep: number;
};
export const Container = styled.section<Props>`
  display: flex;
  flex-direction: column;
  min-width: 420px;
  justify-content: center;
  border: 1px solid #e4e4e4;
  padding: 0.5rem;
  color: #020617;
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  border-radius: 0.5rem;

  .icon-and-text {
    display: flex;
    align-items: flex-start;
    font-weight: 600;
    gap: 0.5rem;
  }

  .description {
    font-weight: 400;
    font-size: 14px;
  }

  .steps-progress {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 14px;

    .progress-bar {
      width: 100%;
      height: 4px;
      border-radius: 0.125rem;
      background-color: #b2b2b2;
      transition: 100ms all;
    }

    .progress-bar::after {
      content: "";
      position: absolute;
      width: ${(props) => `${(props.$lastStep * 100) / props.$actualStep}px`};
      height: 4px;
      border-radius: 0.125rem;
      background-color: #001a8d;
    }
  }
`;
