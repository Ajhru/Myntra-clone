import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';

interface Transaction {
  _id: string;
  amount: number;
  paymentMode: string;
  status: string;
  createdAt: string;
}

const USER_ID = 'PUT_USER_ID_HERE';

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch(`http://YOUR_BACKEND_URL/api/transactions/${USER_ID}`)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Transactions</Text>

      <View style={styles.downloadRow}>
        <Pressable
          onPress={() =>
            Linking.openURL(
              `http://YOUR_BACKEND_URL/api/export/pdf/${USER_ID}`
            )
          }
        >
          <Text style={styles.link}>Download PDF</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            Linking.openURL(
              `http://YOUR_BACKEND_URL/api/export/csv/${USER_ID}`
            )
          }
        >
          <Text style={styles.link}>Download CSV</Text>
        </Pressable>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.amount}>₹ {item.amount}</Text>
            <Text>{item.paymentMode} • {item.status}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: { padding: 12, borderBottomWidth: 1, borderColor: '#ddd' },
  amount: { fontSize: 18, fontWeight: '600' },
  date: { fontSize: 12, color: '#666' },
  link: { color: 'blue', marginRight: 15 },
  downloadRow: { flexDirection: 'row', marginBottom: 10 },
});