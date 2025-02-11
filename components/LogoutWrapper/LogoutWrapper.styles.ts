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

export const DataContainer = styled.div`
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

  .company-and-access-level {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    color: #020617;
    font-size: 1rem;
    font-weight: 600;
    justify-content: space-between;
    margin: 0 1rem;
    border: 1px solid #dfdfdf;
    border-radius: 0.5rem;
    padding: 0.225rem 0.5rem;
  }
`;

export const Button = styled.button`
  background-color: #c9102e;
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

type ChipProps = {
  $backgroundColor: string;
};
export const Chip = styled.span<ChipProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  padding: 0.125rem 0.725rem;
  background-color: ${(color) => color.$backgroundColor};
  border-radius: 0.5rem;
`;
