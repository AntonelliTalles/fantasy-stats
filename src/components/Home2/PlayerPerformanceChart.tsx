import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import api from "../../services/api";
import { ChartData } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  season: number;
  leagueId?: string | null;
  playerId?: string | null;
}

interface PlayerPerformance {
  regularWins: number;
  regularLosses: number;
  playoffsWins: number;
  playoffsLosses: number;
}

const PlayerPerformanceChart: React.FC<Props> = ({ season, leagueId, playerId }) => {
    const [chartData, setChartData] = useState<ChartData<"line", number[], string>>({
        labels: [],
        datasets: []
    });

  useEffect(() => {
    if (!playerId || !leagueId) return;

    api.get(`/player-history?seasonYear=${season}&league=${leagueId}&player=${playerId}`)
      .then(res => {
        const data = res.data;

        setChartData({
          labels: ["Regular Wins", "Regular Losses", "Playoffs Wins", "Playoffs Losses"],
          datasets: [{
            label: "Performance",
            data: [
              data.regularWins,
              data.regularLosses,
              data.playoffsWins,
              data.playoffsLosses
            ],
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
          }]
        });
      });
  }, [season, leagueId, playerId]);

  return (
    <Box p={4} bg="white" borderRadius="md" shadow="sm">
        {chartData && chartData.datasets.length > 0 && (
            <Line data={chartData} />
        )}
    </Box>
  );
};

export default PlayerPerformanceChart;