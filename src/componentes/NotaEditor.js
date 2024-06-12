import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Picker } from "react-native-picker";
import { atualizarNota, removerNota, adicionarNota } from "../services/Notas";

export default function NotaEditor({ showNotas, notaSel, setNotaSel }) {
  const [categoria, setCategoria] = useState("Pessoal");
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [atualizar, setAtualizar] = useState(false);

  async function alterarNota() {
    const nota = {
      id: notaSel.id,
      titulo: titulo,
      categoria: categoria,
      texto: texto,
    };
    await atualizarNota(nota);
    showNotas();
    limparModal();
  }

  async function excluirNota() {
    await removerNota(notaSel.id);
    showNotas();
    limparModal();
  }

  function preencherModal() {
    setTitulo(notaSel.titulo);
    setCategoria(notaSel.categoria);
    setTexto(notaSel.texto);
  }
  function limparModal() {
    setTitulo("");
    setCategoria("Pessoal");
    setTexto("");
    setNotaSel({});
    setModalVisible(false);
  }
  useEffect(() => {
    if (notaSel.id) {
      preencherModal();
      setAtualizar(true);
      setModalVisible(true);
      return;
    }
    setAtualizar(false);
  }, [notaSel]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={estilos.centralizarModal}>
          <ScrollView showVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Criar Nota</Text>
              <Text style={estilos.modalSubTitulo}>Título da Nota</Text>
              <TextInput
                style={estilos.input}
                onChange={(value) => {
                  setTitulo(value);
                }}
                placeholder="Digite o Título"
              />
              <Text style={estilos.modalSubTitulo}>Categoria</Text>
              <View style={estilos.modalPicker}>
                <Picker
                  selectedValue={categoria}
                  onValueChange={(itemValue) => {
                    setCategoria(itemValue);
                  }}
                >
                  <Picker.Item Label="Pessoal" value="Pessoal" />
                  <Picker.Item Label="Trabalho" value="Trabalho" />
                  <Picker.Item Label="Outros" value="Outros" />
                </Picker>
              </View>
              <Text style={estilos.modalSubTitulo}>Conteúdo da nota</Text>
              <Text
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={(novoTexto) => {
                  setTexto(novoTexto);
                }}
                placeholder="Digite aqui sua nota"
                value={texto}
              >
                Conteúdo da nota
              </Text>
              <View style={estilos.modalBotoes}>
                <TouchableOpacity
                  style={estilos.modalBotaoSalvar}
                  onPress={() => {
                    atualizar ? alterarNota() : salvarNota();
                  }}
                >
                  <Text style={esitlos.modalBotaoSalvar}>Salvar</Text>
                </TouchableOpacity>
                {atualizar && (
                  <TouchableOpacity
                    style={estilos.modalBotaoDeletar}
                    onPress={() => {
                      deletarNota();
                    }}
                  >
                    <Text style={estilo.modalBotaoExcluir}>Excluir</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={estilos.modalBotaoCancelar}
                  onPress={() => {
                    limparModal;
                  }}
                >
                  <Text style={estilos.modalBotaoCancelar}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        style={estilos.exibirModal}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={estilos.exibirModalTexto}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const estilos = StyleSheet.create({
  centralizarModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 15,
    marginTop: 8,
    marginHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  modalSubTitulo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },

  modalInput: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ff9a94",
  },

  modalPicker: {
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },

  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalBotaoTexto: {
    color: "#fff",
  },

  modalBotaoSalvar: {
    backgroundColor: "#2ea805",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },

  modalBotaoDeletar: {
    backgroundColor: "#d62a18",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },

  modalBotaoCancelar: {
    backgroundColor: "#057fa8",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },

  exibirModal: {
    backgroundColor: "#54ba32",
    justifyContent: "center",
    height: 64,
    width: 64,
    margin: 16,
    alignItems: "center",
    borderRadius: 9999,
    position: "absolute",
    bottom: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  exibirModalTexto: {
    fontSize: 32,
    lineHeight: 40,
    color: "#FFFFFF",
  },
});
