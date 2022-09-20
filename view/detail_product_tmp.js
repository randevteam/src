<Card>
                    <Card.Title>{title.toUpperCase()}</Card.Title>
                    <Card.Divider />
                    <Card.Image style={detail_product_styles.card_image} source={{
                                uri: ImgUrl,
                            }}>
                                <Text style={primaryBackgroundColor, detail_product_styles.condition}>{condition}</Text>
                    </Card.Image>
                    <Text style={detail_product_styles.price}>
                        {this.state.price} €
                    </Text>
                    <Text style={detail_product_styles.description}>
                        {description}
                    </Text>
                    {combinationTplNew}
                    <View style={detail_product_styles.view_quantity}>
                        <View style={detail_product_styles.view_quantity_child}>
                            <Input
                                placeholder='Quantity'
                                style={detail_product_styles.input}
                                onChangeText={(qtt) => this.changeQuantity(qtt)}
                                value={String(this.state.qtty)}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 4 }}>
                            <Button
                                icon={<Icon name='shopping-cart' color='#ffffff' size={20} style={{marginRight: 5}}/>}
                                buttonStyle={detail_product_styles.button, {backgroundColor: '#713F18'}}
                                onPress={() => {
                                    this.addToCart();
                                }}
                                title="Ajouter au panier"
                            />
                        </View>

                    </View>
                </Card>