<Card containerStyle={{height:'100%'}}>
                    <Card.Title>{item.product_name}</Card.Title>
                    <Card.Divider />
                    <Text style={{ marginBottom: 10 }}>
                        quantity: {item.quantity}
                    </Text>
                    <View>
                    <Button
                        buttonStyle={{
                            backgroundColor: '#713F18'
                        }}
                        // onPress={() => this.delete_cart(item.id_product, item.id_product_attribute)}
                        title="Supprimer"
                    />
                    </View>
                    
                </Card>