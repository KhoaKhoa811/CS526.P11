import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handlePress = (value: string) => {
    if (value === "=") {
      try {
        let expression = display;
        if (expression.includes("%")) {
          expression = expression.replace(/(\d+)%/g, "($1 / 100)");
        }
        const calcResult = eval(expression).toString();
        setResult(calcResult);

        setHistory([...history, `${display} = ${calcResult}`]);
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setDisplay("");
      setResult("");
    } else {
      setDisplay(display + value);
      setResult("");
    }
  };

  const backspace = () => {
    setDisplay(display.slice(0, -1));
    setResult("");
  };

  const toggleHistoryView = () => {
    setShowHistory(!showHistory);
  };

  const clearHistory = () => {
    setHistory([]); // Clear the history
  };

  const operators = ["(", ")", "%", "/", "*", "-", "+"];

  const renderButton = (label: string) => (

    <TouchableOpacity
      style={[styles.button, label === "=" && styles.greenButton]}
      onPress={() => handlePress(label)}
    >
      <Text style={[styles.buttonText, 
                    label === "C" && styles.redButtonText,
                    label === "=" && styles.blackButtonText,
                    operators.includes(label) && styles.greenButtonText]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <View style={styles.controlContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleHistoryView}>
          <Text style={styles.controlButtonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={backspace}>
          <Text style={styles.controlButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hr} />
      {!showHistory ? (
        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            {["(", ")", "%", "C"].map(renderButton)}
          </View>
          <View style={styles.row}>
            {["7", "8", "9", "/"].map(renderButton)}
          </View>
          <View style={styles.row}>
            {["4", "5", "6", "*"].map(renderButton)}
          </View>
          <View style={styles.row}>
            {["1", "2", "3", "-"].map(renderButton)}
          </View>
          <View style={styles.row}>
            {["0", ".", "=", "+"].map(renderButton)}
          </View>
        </View>
      ) : (
        <View style={styles.historyContainer}>
          <ScrollView>
            {history.length === 0 ? (
              <Text style={styles.historyText}>No history available</Text>
            ) : (
              history.map((entry, index) => {
                const [expression, result] = entry.split(' = ');
                return (
                <View key={index}>
                  <Text style={styles.historyText}>{expression}</Text>
                  <Text style={styles.historyResultText}>{`= ${result}`}</Text>
                  <View style={styles.hr} />
                </View>
              );
            })
            )}
          </ScrollView>

          <TouchableOpacity style={styles.clearHistoryButton} onPress={clearHistory}>
            <Text style={styles.clearHistoryButtonText}>Clear History</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  displayContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  displayText: {
    fontSize: 40,
    color: "#ffffff",
  },
  resultText: {
    fontSize: 30,
    color: "#7cfc00",
  },
  hr: {
    height: 3,
    backgroundColor: '#202020',
    marginVertical: 10,
  },
  buttonsContainer: {
    flex: 2,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#202020",
    padding: 20,
    borderRadius: 50,
    width: 80,
    alignItems: "center",
  },
  greenButton: {
    backgroundColor: "#009900",
    padding: 20,
    borderRadius: 50,
    width: 80,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
    color: "#ffffff",
  },
  redButtonText: {
    fontSize: 30,
    color: "#CC0000",
  },
  greenButtonText: {
    fontSize: 30,
    color: "#009900",
  },
  blackButtonText: {
    fontSize: 30,
    color: "#000",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 2,
  },
  controlButton: {
    backgroundColor: "#000",
    padding: 6,
    
  },
  controlButtonText: {
    fontSize: 15,
    color: "#ffffff",
  },
  historyContainer: {
    flex: 2,
    height: 500,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  historyText: {
    fontSize: 18,
    color: "#ffffff",
    marginVertical: 2,
    margin: 20
  },
  historyResultText: {
    fontSize: 22,
    color: "#7cfc00",
    marginVertical: 2,
    margin: 20
  },
  clearHistoryButton: {
    backgroundColor: "#CC0000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  clearHistoryButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default Calculator;
