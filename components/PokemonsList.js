import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Button, Alert, Image } from 'react-native';
import { s } from 'react-native-size-matters';

const styles = StyleSheet.create({
    containerList: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerItem: {
        backgroundColor: '#f2f2f2',
        width: s(220),
        margin: 3,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center'
    },
    pokeItem: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2
    },
    pressedContainer: {
        backgroundColor: '#333',
        margin: 3,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center'
    },
    pressedItem: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
    }
});

const PokemonName = ({ item, pokemonsList, setPokemonsList, fetchPokemonDetails, handleRemoveOrHide }) => {

    const handlePress = (item) => {
        const newList = pokemonsList.map((p) => {
            if (p.index === item.index) {
                return { ...p, pressed: !p.pressed }
            }
            return p;
        });
        setPokemonsList(newList);
    };

    return (
        <View style={item.pressed ? styles.pressedContainer : styles.containerItem}>
            <Pressable onPress={() => handlePress(item)}>
                <Text style={item.pressed ? styles.pressedItem : styles.pokeItem}>
                    {item.index + 1} - {item.name}
                </Text>
            </Pressable>
            <Button title="More Details" onPress={() => fetchPokemonDetails(item.index)} />
            <Button title="Hide" onPress={() => handleRemoveOrHide(item.index)} />
            {item.details && (
                <View>
                    <Text>ID: {item.details.id}</Text>
                    <Text>Types: {item.details.types.map(type => type.type.name).join(", ")}</Text>
                    <Image source={{ uri: item.details.sprite }} style={{ width: 50, height: 50 }} />
                </View>
            )}
        </View>
    );
};

const PokemonsList = () => {

    const [pokemonsList, setPokemonsList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [lastFetchedIndex, setLastFetchedIndex] = useState(0);

    const fetchPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${lastFetchedIndex + 1}`);
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }
            const data = await response.json();
            setPokemonsList((prevPokemonList) => [...prevPokemonList, { index: lastFetchedIndex, name: data.name, isHidden: false, details: null }]);
            setLastFetchedIndex((prevIndex) => prevIndex + 1);
        } catch (error) {
            console.error("Error fetching data:", error);
            setErrorMessage("An error occurred while fetching data. Please try again later.");
        }
    };

    const fetchPokemonDetails = async (index) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }
            const data = await response.json();
            const updatedPokemonList = [...pokemonsList];
            updatedPokemonList[index].details = {
                id: data.id,
                types: data.types,
                sprite: data.sprites.front_default
            };
            setPokemonsList(updatedPokemonList);
        } catch (error) {
            console.error("Error fetching details:", error);
            setErrorMessage("An error occurred while fetching details. Please try again later.");
        }
    };

    const handleRemoveOrHide = (index) => {
        setPokemonsList((prevPokemonList) => {
            const updatedPokemonList = [...prevPokemonList];
            updatedPokemonList[index].isHidden = true;
            return updatedPokemonList;
        });
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    return (
        <View style={styles.containerList}>
            <Text>Pokemons List</Text>
            <Button title="Fetch Pokémon" onPress={fetchPokemon} />
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            <FlatList
                style={styles.pokeList}
                data={pokemonsList.filter(pokemon => !pokemon.isHidden)}
                renderItem={({ item }) => (
                    <PokemonName 
                        item={item} 
                        pokemonsList={pokemonsList} 
                        setPokemonsList={setPokemonsList} 
                        fetchPokemonDetails={fetchPokemonDetails} 
                        handleRemoveOrHide={handleRemoveOrHide} 
                    />
                )}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
};

export default PokemonsList;
