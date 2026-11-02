import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Flug oder Ziel suchen...',
}: SearchBarProps) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#8b949e"
      clearButtonMode="while-editing"
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="search"
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
        <Text style={styles.clearText}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    backgroundColor: '#21262d',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  input: {
    flex: 1,
    color: '#e6edf3',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  clearButton: { paddingRight: 12 },
  clearText: { color: '#8b949e', fontSize: 16 },
});

export default SearchBar;
