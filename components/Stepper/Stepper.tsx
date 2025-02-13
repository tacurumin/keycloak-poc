import { JSX } from "react";
import * as S from "./Stepper.styles";

export const Stepper = ({ steps, activeStep = 0 }: Props) => {
  if (steps.length > 0)
    return (
      <S.Container $actualStep={activeStep + 1} $lastStep={steps.length}>
        <div className="icon-and-text">
          {steps[activeStep].icon}
          <span>
            <p>{steps[activeStep].name}</p>
            <p className="description">
              {steps[activeStep].description && steps[activeStep].description}
            </p>
          </span>
        </div>
        <div className="steps-progress">
          <span className="progress-bar" />
          <span>{`${activeStep + 1}/${steps.length}`}</span>
        </div>
      </S.Container>
    );
  return <></>;
};

type Steps = {
  name: string;
  description?: string;
  icon: JSX.Element;
};

type Props = {
  steps: Steps[];
  activeStep: number;
};
