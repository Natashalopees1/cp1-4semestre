import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Image } from 'react-native'
import { useQuery, useMutation } from '@tanstack/react-query'  //Hook para fazer queries
import { fetchUsers, createUser } from './api/api' //Função de requisição
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
   
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })

    //Criando mutation para enviar um novo usuário
    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => refetch()//Atualiza a lista após a criação do usário
    })

    //Exibe um spinner durante o carregamento dos dados
    if (isLoading) {
        return <ActivityIndicator size='large' style={styles.center} />
    }

    //Mostrar msg no cenário de error
    if (isError) {
        return (
            <View style={styles.center}>
                <Text> Error ao buscar os dados</Text>
                <Text> Error:{error.message}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <FlatList
                data={data}
                refreshing={isFetching}//Mostrar o spinner durante o refect
                onRefresh={refetch}//Chamada automática do refect ao puxar
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.avatar }} width={200} height={200} />
                        <Text style={styles.title}>{item.name}</Text>
                    </View>

                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4
    }
})