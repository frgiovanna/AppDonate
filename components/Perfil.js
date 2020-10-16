import React, { Component } from 'react';
import { Button } from 'react-native';
import { Text, TouchableHighlight, Image, StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axiosInstance from '../lib/axios';
import axios from '../lib/axios'

// function Item({ nome, email, imagem, depoimento, comentario, usuario, reacoes }) {
//     return (
//         <View><Informacoes
//             nome={nome}
//             email={email}
//             imagem={imagem} />
//             <View style={estilo.item}>

//                 <DadosPerfil nome={nome}
//                     depoimento={depoimento}
//                     imagem={imagem}
//                     comentario={comentario}
//                     usuario={usuario}
//                     reacoes={reacoes} />
//             </View>
//         </View>

//     );
// }



class Perfil extends React.Component {
    //construtor para uso do props
    constructor(props) {
        super(props)
    }
    
    //renderização do componente
    render() {
        const { auth: { user } } = this.props
        const getPosts = () => {
            return axios.get(`/post/user/${user.codigo}`)
                .then(res => res.data)
        }
        
        var imagem = null;
        if (user.foto == null) {
            imagem = 'https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png'
        } else {
            imagem = user.foto
        }

        return (
            <View style={{ backgroundColor: 'white' }}>

                <View style={estilo.viewTitulo}>
                    <TouchableHighlight
                        underlayColor='white'
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Image style={estilo.menu} source={require('../assets/images/menu.png')} />
                    </TouchableHighlight>
                    <Text style={estilo.titulo}>MEU PERFIL</Text>
                </View>

                <View style={estilo.perfil}>

                    <Image style={estilo.imagem} source={{ uri: imagem }} />
                    <Text style={estilo.nome}>{user.nome}</Text>
                </View>
                <View>
                    <FlatList
                        data={getPosts()}
                        renderItem={({ item }) => (
                            <Item>{item.texto}</Item>
                        )}
                        keyExtractor={item => item.codigo}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = store => ({
    auth: store.auth
})

export default connect(mapStateToProps)(Perfil);

const estilo = StyleSheet.create({
    comentario: {
        fontSize: 16,
        textAlign: 'justify',
        margin: 5
    },
    user: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 25
    },
    imagem: {
        margin: 10,
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        borderRadius: 20
    },
    perfil: {
        flexDirection: 'row',
        marginBottom: 10
    },
    depoimento: {
        textAlign: 'justify',
        fontSize: 16,
    },
    coment: {
        marginTop: 5,
        borderWidth: 0.3,
        borderColor: '#D6CBD6',
        backgroundColor: '#F8F8F8'

    },
    reacao: {
        marginTop: 5,
        fontWeight: 'bold',
        color: '#3693BA'
    },
    botao: {
        backgroundColor: '#3693BA',
        borderRadius: 10,
        padding: 5,
        marginLeft: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.37,
        shadowRadius: 3.49,
        elevation: 3,

    },
    mensagem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: 10,
    },
    input: {
        width: 240,
        height: 30,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5
    },
    item: {
        marginHorizontal: 10,
        margin: 8,
        padding: 10,
        borderWidth: 0.3,
        borderColor: '#D6CBD6',
        borderRadius: 5
    },
    menu: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
    viewTitulo: {
        flexDirection: 'row',
        paddingTop: 20,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.49,
        elevation: 5,
    },
    titulo: {
        color: '#3693BA',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
        marginLeft: 10

    },
})
