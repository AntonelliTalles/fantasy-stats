import React from 'react';
import PlayerProfile from '../components/PlayerProfile';

const PlayerProfilePage: React.FC = () => {
  const playerData = {
    name: 'John Doe',
    age: 28,
    fantasyTeams: ['Team A', 'Team B'],
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
    achievements: 'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.',
    recentPerformance: 'Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.'
  };

  return (
    <PlayerProfile
      name={playerData.name}
      age={playerData.age}
      fantasyTeams={playerData.fantasyTeams}
      details={playerData.details}
      achievements={playerData.achievements}
      recentPerformance={playerData.recentPerformance}
    />
  );
};

export default PlayerProfilePage;
