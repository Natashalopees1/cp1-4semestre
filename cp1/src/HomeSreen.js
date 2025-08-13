import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchUsers, createUser } from './api/api'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => refetch()
    })

    if (isLoading) {
        return <ActivityIndicator size='large' style={styles.center} />
    }

    if (isError) {
        return (
            <View style={styles.center}>
                <Text> Error ao buscar os dados</Text>
                <Text> Error:{error.message}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ece9f7' }}>
            <FlatList
                data={data}
                refreshing={isFetching}
                onRefresh={refetch}
                contentContainerStyle={{ paddingVertical: 16 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.label}>Username: <Text style={styles.value}>{item.username}</Text></Text>
                            <Text style={styles.label}>Email: <Text style={styles.value}>{item.email}</Text></Text>
                            <Text style={styles.label}>City: <Text style={styles.value}>{item.address?.city}</Text></Text>
                        </View>
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
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6c63ff',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
        color: '#fff'
    },
    label: {
        fontWeight: '600',
        color: '#e0e0e0',
        marginBottom: 4,
    },
    value: {
        fontWeight: '400',
        color: '#f8f9fa'
    }
})