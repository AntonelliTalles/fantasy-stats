import React, { useState } from "react";
import { Input, Button, Tag, TagCloseButton, TagLabel, Stack, useToast  } from "@chakra-ui/react";
import axios from "axios";

const AddPlayer = () => {
  const [name, setName] = useState("");
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [leagueTypes, setLeagueTypes] = useState<string[]>([]);
  const [titlesWon, setTitlesWon] = useState<string[]>([]);
  const [favoriteTeamsInput, setFavoriteTeamsInput] = useState("");
  const [leagueTypesInput, setLeagueTypesInput] = useState("");
  const [titlesWonInput, setTitlesWonInput] = useState("");

  const toast = useToast();

  const handleTagAdd = (
    input: string, 
    setTags: React.Dispatch<React.SetStateAction<string[]>>, 
    currentTags: string[],
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (input.trim() && !currentTags.includes(input.trim())) {
      setTags(prevTags => [...prevTags, input.trim()]);
      setInput("");
    }
  };

  const handleTagRemove = (
    input: string, 
    setTags: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setTags(prevTags => prevTags.filter(tag => tag !== input));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const playerData = {
      name,
      favoriteTeams,
      leagueTypes,
      titlesWon
    };
    try {
      const response = await axios.post("http://localhost:5000/api/players", playerData);
      console.log("Jogador Cadastrado:", response.data);

      toast({
        title: "Jogador Cadastrado!",
        description: "O jogador foi cadastrado com sucesso.",
        status: "success",
        duration: 3000,  
        isClosable: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    } catch (error) {
      console.error("Erro ao cadastrar jogador:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        placeholder="Nome do jogador" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      
      <Stack spacing={2} mt={4}>
        <Input
          value={favoriteTeamsInput}
          placeholder="Times que torce"
          onChange={(e) => setFavoriteTeamsInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); 
              handleTagAdd(favoriteTeamsInput, setFavoriteTeams, favoriteTeams, setFavoriteTeamsInput);
            }
          }}
        />
        <Stack direction="row" spacing={2}>
          {favoriteTeams.map((team, index) => (
            <Tag key={index} size="lg" borderRadius="full" variant="solid" colorScheme="teal">
              <TagLabel>{team}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(team, setFavoriteTeams)} />
            </Tag>
          ))}
        </Stack>

        <Input
          value={leagueTypesInput}
          placeholder="Ligas de Fantasy"
          onChange={(e) => setLeagueTypesInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleTagAdd(leagueTypesInput, setLeagueTypes, leagueTypes, setLeagueTypesInput);
            }
          }}
        />
        <Stack direction="row" spacing={2}>
          {leagueTypes.map((league, index) => (
            <Tag key={index} size="lg" borderRadius="full" variant="solid" colorScheme="blue">
              <TagLabel>{league}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(league, setLeagueTypes)} />
            </Tag>
          ))}
        </Stack>

        <Input
          value={titlesWonInput}
          placeholder="Títulos conquistados"
          onChange={(e) => setTitlesWonInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); 
              handleTagAdd(titlesWonInput, setTitlesWon, titlesWon, setTitlesWonInput);
            }
          }}
        />
        <Stack direction="row" spacing={2}>
          {titlesWon.map((title, index) => (
            <Tag key={index} size="lg" borderRadius="full" variant="solid" colorScheme="purple">
              <TagLabel>{title}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(title, setTitlesWon)} />
            </Tag>
          ))}
        </Stack>
      </Stack>

      <Button mt={4} type="submit">Cadastrar Jogador</Button>
    </form>
  );
};

export default AddPlayer;
