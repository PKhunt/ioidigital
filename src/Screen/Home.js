import { ActivityIndicator, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Colors } from '../Common/Color'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Fonts } from '../Common/fonts'
import { RFValue } from 'react-native-responsive-fontsize'
import { plus } from '../Common/image'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            accesstoken: '',
            orgToken: '',
            invoiceData: [],
        }

    }

    componentDidMount() {
        this.setState({ loading: true })

        let qs = require('qs');
        let data = qs.stringify({
            'client_id': 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
            'client_secret': '0Exp4dwqmpON_ezyhfm0o_Xkowka',
            'grant_type': 'password',
            'scope': 'openid',
            'username': 'dung+octopus4@101digital.io',
            'password': 'Abc@123456'
        });
        let config = {
            method: 'post',
            url: 'https://sandbox.101digital.io/token?tenantDomain=carbon.super',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'JSESSIONID=B51D0A21D53D71E334C77D29607825FE'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                this.setState({ loading: false })
                console.log(JSON.stringify(response.data));
                const { access_token } = response.data;
                console.log("access_token", access_token);
                this.setState({ accesstoken: access_token });
                this.userProfile(access_token);

            })
            .catch((error) => {
                this.setState({ loading: false })
                console.log(error);
            });

        // let myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer f626ff29-4688-3136-ad18-8ec2aa9a83d4");
        // myHeaders.append("Cookie", "JSESSIONID=80B59844F88A1D2FBBB9445E4211ADE0");

        // var requestOptions = {
        //   method: 'GET',
        //   headers: myHeaders,
        //   redirect: 'follow'
        // };

        // fetch("https://sandbox.101digital.io/membership-service/1.2.0/users/me", requestOptions)
        //   .then(response => response.text())
        //   .then(result => console.log(result))
        //   .catch(error => console.log('error', error));


    }

    fetchInvoice(token) {


        let config = {
            method: 'get',
            url: 'https://sandbox.101digital.io/invoice-service/1.0.0/invoices?\npageNum=1&pageSize=10&dateType=INVOICE_DATE&sortBy=CREATED_DATE&\nordering=ASCENDING',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.accesstoken}`,
                'Operation-Mode': 'SYNC',
                'org-token': token,
                'Cookie': 'JSESSIONID=F08B9B07E6494F9C63FA46AFE7CB3814; JSESSIONID=6AD53CD6D04F063B4942E6FAC625FC8F'
            }
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.data));
                this.setState({ invoiceData: response.data.data });
            })
            .catch((error) => {
                console.log(error);
            });

    }


    userProfile(token) {
        console.log("token", token
        );

        this.setState({ loading: true })



        let config = {
            method: 'get',
            url: 'https://sandbox.101digital.io/membership-service/1.2.0/users/me',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cookie': 'JSESSIONID=80B59844F88A1D2FBBB9445E4211ADE0'
            }
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const { token } = response.data.data.memberships[0]
                console.log("memberships", token);
                this.setState({ orgToken: token })
                this.setState({ loading: false })
                this.fetchInvoice(token);
            })
            .catch((error) => {
                this.setState({ loading: false })
                console.log(error);
            });

    }

    render() {
        return (
            <>
                {this.state.loading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} color={Colors.blue} />
                    </View>
                ) : (
                    <SafeAreaView style={styles.flexview}>
                        <StatusBar translucent backgroundColor={Colors.transparent} barStyle={'dark-content'} />
                        <View style={styles.container}>
                            <View style={styles.flexrow}>
                                <Text style={styles.title}>Home</Text>
                                <TouchableOpacity style={styles.imageStyle} onPress={() => { this.props.navigation.navigate("Createinvoice", { token: this.state.accesstoken, orgToken: this.state.orgToken }) }}>
                                    <Image source={plus} style={styles.plusImage} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.containerStyle}
                                    data={this.state.invoiceData}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{  marginVertical: RFValue(5), backgroundColor: 'lightgray', padding: RFValue(8), borderRadius: RFValue(6), }}>
                                                <View style={styles.flexrow}>
                                                    <Text style={styles.maintext}>{item.invoiceNumber}</Text>
                                                    <Text style={styles.maintext}>{item.status[0].key}</Text>
                                                </View>
                                                <View style={styles.listview2}>
                                                    <Text style={styles.description}>{item.description}</Text>
                                                    <Text style={styles.dateText}>{item.dueDate}</Text>
                                                </View>
                           
                                            </View>

                                        )
                                    }}
                                />
                            </ScrollView>
                        </View>
                    </SafeAreaView >
                )}
            </>
        )
    }
}

const styles = StyleSheet.create({
    flexview: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: RFValue(10)
    },
    main: {
        marginTop: RFValue(10)
    },
    containerStyle: {
        paddingHorizontal: RFValue(10),
        marginTop: RFValue(15),
        marginBottom: RFValue(50)
    },
    title: {
        fontFamily: Fonts.Medium,
        fontSize: RFValue(24),
        color: Colors.black,
        marginLeft: RFValue(5),
        marginTop: RFValue(2),
    },
    description:{ color: Colors.black, fontFamily: Fonts.RobotoRegular, fontSize: RFValue(10), width: width * 0.65 },
    flexrow: {
        marginTop: RFValue(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateText:{ color: Colors.black, fontFamily: Fonts.Medium, fontSize: RFValue(11) },
    listview2:  { flexDirection: 'row', marginTop: RFValue(5), justifyContent: 'space-between', },
    maintext:{ color: Colors.black, fontFamily: Fonts.Medium, fontSize: RFValue(14) },
    imageStyle: {
        alignSelf: 'center',
        backgroundColor: Colors.blue,
        padding: RFValue(10),
        borderRadius: RFValue(20)
    },
    plusImage: {
        width: RFValue(18),
        height: RFValue(18),
        tintColor: Colors.white,
        resizeMode: 'contain'
    },
})