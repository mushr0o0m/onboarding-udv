import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth, useTodo } from '../../../utils/indext';
import { useGame } from '../../../utils/contextes/GameContext/useGame';
import { getOnboardingOverStatus, putOnboardingOverStatus } from './api/onboardingOverRequest';
import { OnboardingFinishModal } from './components/OnboardingFinishModal';
import Confetti from 'react-confetti';
import { NavbarComponent } from '../../../modules/indext';

export const ApprenticeMainPage: React.FC = () => {

  const navs = [
    { title: 'Мои задачи', url: 'criteria' },
    { title: 'Продукты', url: 'education' },
    { title: 'Мой офис', url: 'office' },
  ]

  const [showModal, setShowModal] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { tasks } = useTodo();
  const { game } = useGame();
  const { token, userName } = useAuth();

  React.useEffect(() => {
    getOnboardingOverStatus(token)
      .then((status) => {
        setShowModal(status === true);
        setShowConfetti(status === true);
      });

  }, [game, tasks, token])

  React.useEffect(() => {
    getOnboardingOverStatus(token)
      .then((status) => {
        setShowModal(status === true);
        setShowConfetti(status === true);
      });

  }, [game, tasks, token])

  return (
    <>
      <NavbarComponent navs={navs} homeUrl='/apprentice' userName={userName} />
      <Outlet />
      <OnboardingFinishModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        toggleConfetti={() => setShowConfetti(false)}
        finishOnboarding={() => (putOnboardingOverStatus(token))}
      />
      {showConfetti && <Confetti />}
    </>
  );
};