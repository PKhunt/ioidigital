import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../Common/Color'
import { Fonts } from '../Common/fonts'
import { RFValue } from 'react-native-responsive-fontsize'
import { down, minus, plus, up } from '../Common/image'
import validator from 'validator';
import DateTimePicker from 'react-native-modal-datetime-picker'
import DocumentPicker from 'react-native-document-picker';
import moment from 'moment'
import ModalDropdown from 'react-native-modal-dropdown';
import uuid from 'react-native-uuid';
import Toast from 'react-native-simple-toast'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class Createinvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceArray: ['Bank Account', 'Customer', 'Address', 'Documents', 'Invoice', 'Extensions', 'Items'],
            expandedIndex: -1,
            title: '',
            accountNumber: 0,
            accountName: '',
            sortCode: '',
            firstName: '',
            lastName: '',
            phoneNo: 0,
            email: '',
            premise: '',
            city: '',
            country: ['India', 'USA', 'Canada', 'UK', 'South Africa', 'Germany', 'China', 'Singapore'],
            countryN: '',
            countryCode: '',
            postCode: '',
            documentopen: false,
            documentName: null,
            document: '',
            documentdata: [
                'Bill',
                'Bill2',
                'Bill3',
                'Bill4',
                'Bill5',
                'Bill6',

            ],
            currentDate: new Date(),
            invoiceDate: '',
            dueDate: '',
            invoiceDateModel: false,
            dueDateModel: false,
            invoiceDescription: '',
            itemExtensions: [{ deductType: '', name: '', value: '', type: '' }],
            extensions: [{ deductType: '', name: '', value: '', type: '' }],
            itemName: '',
            itemDescription: '',
            deductType: 'Add',
            selectCountry: 'Select Country',
            selectDocument: 'Select Document Type',
            ExtensionType: ['PERCENTAGE', 'FIXED_VALUE'],
            currency: '',
            invoiceNumber: '',
            bankAccountNoerrMsg: '',
            bankAccountnameMsg: '',
            sortCodeMsg: '',
            firstMsg: '',
            lastMsg: '',
            phoneNoMsg: '',
            emailMsg: '',
            premiseMsg: '',
            postalMsg: '',
            cityMsg: '',
            countryMsg: '',
            countryCodeMsg: '',
            documentFileMsg: '',
            documentTypeMsg: '',
            invoiceDateMsg: '',
            dueDateMsg: '',
            invoiceDMsg: '',
            invoiceCurrencyMsg: '',
            invoiceNoMsg: '',
            itemNameMsg: '',
            itemDMsg: '',
            sortCodeModel: false,
            accesstoken: '',
            orgtoken: '',

        };
    }

    componentDidMount() {
        console.log(this.props.route.params);
        const { orgToken, token } = this.props.route.params;
        this.setState({ accesstoken: token, orgtoken: orgToken })
        // console.log("u-->",uuid.v4());
        let RandomNumber = Math.floor(Math.random() * 1000000000) + 1;
        console.log("random", RandomNumber);
    }


    documentopen = async () => {
        const res = await DocumentPicker.pick({ type: DocumentPicker.types.pdf })

        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res[0].uri);
        console.log('Type : ' + res[0].type);
        console.log('File Name : ' + res[0].name);
        console.log('File Size : ' + res[0].size);
        this.setState({ document: res[0].name, documentFileMsg: '' })
    }

    additemExtensions = () => {

        let data = []
        data = this.state.itemExtensions
        data.push({ deductType: '', name: '', value: '', type: '' })
        this.setState({ itemExtensions: data })
    }

    removeitemExtensions = (i) => {
        console.log("i", i);
        this.state.itemExtensions.splice(i, 1);
        console.log("ec-->", this.state.itemExtensions);
        this.forceUpdate();
    }

    addExtensions = () => {

        let data = []
        data = this.state.extensions
        data.push({ deductType: '', name: '', value: '', type: '' })
        this.setState({ extensions: data })
    }

    removeExtensions = (i) => {
        console.log("i", i);
        this.state.extensions.splice(i, 1);
        console.log("ec-->", this.state.extensions);
        this.forceUpdate();
    }

    showDatePicker3 = () => {
        this.setState({ sortCodeModel: true });
    };

    hideDatePicker3 = () => {
        this.setState({ sortCodeModel: false });
    };

    handleConfirm3 = (date) => {
        this.setState({
            sortCodeModel: false,
            sortCodeMsg: '',
            sortCode: moment(date).format("YYYY-MM-DD")//moment(date).format("YYYY-MM-DD"),
        });
        console.log(date);
    };


    showDatePicker = () => {
        this.setState({ invoiceDateModel: true });
    };

    hideDatePicker = () => {
        this.setState({ invoiceDateModel: false });
    };

    handleConfirm = (date) => {
        this.setState({
            invoiceDateModel: false,
            invoiceDateMsg: '',
            invoiceDate: moment(date).format("YYYY-MM-DD")//moment(date).format("YYYY-MM-DD"),
        });
        console.log(date);
    };

    showDatePicker2 = () => {
        this.setState({ dueDateModel: true });
    };

    hideDatePicker2 = () => {
        this.setState({ dueDateModel: false });
    };

    handleConfirm2 = (date) => {
        this.setState({
            dueDateModel: false,
            dueDateMsg: '',
            dueDate: moment(date).format("YYYY-MM-DD")//moment(date).format("YYYY-MM-DD"),
        });
        console.log(date);
    };

    changeIndex(data, index) {
        console.log("data", data, "index", index);
        this.state.expandedIndex == index ? this.setState({ expandedIndex: -1, title: '' }) : this.setState({ expandedIndex: index, title: data })
    }
    makestring(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    onSubmit() {

        let itemref = this.makestring(10);



        console.log("u-->", uuid.v4());
        let documentid = uuid.v4();
        let bankid = uuid.v4();

        let RandomNumber = Math.floor(Math.random() * 1000000000) + 1;
        let quantity = Math.floor(Math.random() * 10) + 1;
        let rate = Math.floor(Math.random() * 1000) + 1;
        console.log("q", quantity);
        console.log("q", rate);
        const phonetest = validator.isNumeric(this.state.phoneNo.toString());
        const emailtest = validator.isEmail(this.state.email);
        const numbertest = validator.isNumeric(this.state.accountNumber.toString());
        console.log("phonetest", emailtest);

        if (this.state.accountNumber == '') {
            this.setState({ bankAccountNoerrMsg: 'Please enter Bank Account Number ' })
        }
        if (!numbertest) {
            this.setState({ bankAccountNoerrMsg: 'Please enter Valid Bank Account Number ' })

        }
        if (this.state.accountName == '') {
            this.setState({ bankAccountnameMsg: 'Please enter Bank Account Name ' })
        }
        if (this.state.sortCode == '') {
            this.setState({ sortCodeMsg: 'Please enter Bank Sort Code ' })
        }
        if (this.state.firstName == '') {
            this.setState({ firstMsg: 'Please enter first name ' })
        }
        if (this.state.lastName == '') {
            this.setState({ lastMsg: 'Please enter last name ' })
        }
        if (this.state.phoneNo == '') {
            this.setState({ phoneNoMsg: 'Please enter phone no' })
        }
        if (!emailtest) {
            if (this.state.email == '') {
                this.setState({ emailMsg: 'Please enter email' })
            } else {
                this.setState({ emailMsg: 'Please enter valid email' })
            }
        }
        if (!phonetest) {
            this.setState({ phoneNoMsg: 'Please enter valid phone no' })
        }
        if (this.state.premise == '') {
            this.setState({ premiseMsg: 'Please enter premise' })
        }
        if (this.state.postCode == '') {
            this.setState({ postalMsg: 'Please enter postal code' })
        }
        if (this.state.city == '') {
            this.setState({ cityMsg: 'Please enter city' })
        }
        if (this.state.selectCountry == 'Select Country') {
            this.setState({ countryMsg: 'Please enter country' })
        }
        if (this.state.countryCode == '') {
            this.setState({ countryCodeMsg: 'Please enter country code ' })
        }
        if (this.state.document == '') {
            this.setState({ documentFileMsg: 'Please enter document file ' })
        }
        if (this.state.selectDocument == 'Select Document Type') {
            this.setState({ documentTypeMsg: 'Please enter document type ' })
        }
        if (this.state.invoiceDate == '') {
            this.setState({ invoiceDateMsg: 'Please enter invoice date' })
        }
        if (this.state.dueDate == '') {
            this.setState({ dueDateMsg: 'Please enter invoice due date' })
        }
        if (this.state.invoiceDescription == '') {
            this.setState({ invoiceDMsg: 'Please enter invoice descritpion' });
        }
        if (this.state.currency == '') {
            this.setState({ invoiceCurrencyMsg: 'Please enter invoice currency' });
        }
        if (this.state.invoiceNumber == '') {
            this.setState({ invoiceNoMsg: 'Please enter invoice Number' });
        }
        if (this.state.itemName == '') {
            this.setState({ itemNameMsg: 'Please enter item name' });
        }
        if (this.state.itemDescription == '') {
            this.setState({ itemDMsg: 'Please enter item description' });

        }
        else {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${this.state.accesstoken}`);
        myHeaders.append("Operation-Mode", "SYNC");
        myHeaders.append("org-token", this.state.orgtoken);
        myHeaders.append("Cookie", "JSESSIONID=BFF8FF3F6AA54EF790A77903C4C13456; JSESSIONID=9257240D7E3921ADEEBC976024154FD8");



        let data = JSON.stringify({
            "listOfInvoices": [
                {
                    "bankAccount": {
                        "bankId": bankid,
                        "sortCode": this.state.sortCode,
                        "accountNumber": this.state.accountNumber,
                        "accountName": this.state.accountName
                    },
                    "customer": {
                        "firstName": this.state.firstName,
                        "lastName": this.state.lastName,
                        "contact": {
                            "email": this.state.email,
                            "mobileNumber": this.state.phoneNo
                        },
                        "addresses": [
                            {
                                "premise": this.state.premise,
                                "countryCode": this.state.countryCode,
                                "postcode": this.state.postCode,
                                "county": this.state.selectCountry,
                                "city": this.state.city
                            }
                        ]
                    },
                    "documents": [
                        {
                            "documentId": documentid,
                            "documentName": this.state.selectDocument,
                            "documentUrl": this.state.document
                        }
                    ],
                    "invoiceReference":RandomNumber,
                    "invoiceNumber": `INV${this.state.invoiceNumber}`,
                    "currency": this.state.currency,
                    "invoiceDate": this.state.invoiceDate,
                    "dueDate": this.state.dueDate,
                    "description": this.state.invoiceDescription,
                    "customFields": [
                        {
                            "key": "invoiceCustomField",
                            "value": "value"
                        }
                    ],
                    "extensions": this.state.extensions,
                    "items": [
                        {
                            "itemReference": itemref,
                            "description": this.state.itemDescription,
                            "quantity": quantity,
                            "rate": rate,
                            "itemName": this.state.itemName,
                            "itemUOM": "KG",
                            "customFields": [
                                {
                                    "key": "taxiationAndDiscounts_Name",
                                    "value": "VAT"
                                }
                            ],
                            "extensions": this.state.itemExtensions
                        }
                    ]
                }
            ]
        });
       
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        fetch("https://sandbox.101digital.io/invoice-service/1.0.0/invoices", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log("result", result);
                
                if(result?.status?.code == '000000'){
                    Alert.alert(result?.status?.message);
                    this.props.navigation.navigate('Home');
                }

               Alert.alert(result?.errors[0]?.message);
                   
                })
                .catch(error =>
                {
                    console.log('error-->', error);
                  
                      
                });

        }
    }



render() {

    return (
        <SafeAreaView style={styles.flexview}>
            <View style={styles.container}>
                <Text style={styles.title}>Create Invoice</Text>
                <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
                    {this.state.invoiceArray.map((data, index) => {
                        return (
                            <>
                                <View style={[styles.flexrow, { paddingHorizontal: RFValue(5), marginVertical: RFValue(5) }]}>
                                    <Text style={styles.label}>{data}</Text>
                                    <TouchableOpacity style={styles.imageStyle} onPress={() => { this.changeIndex(data, index) }}>
                                        <Image source={this.state.expandedIndex == index ? up : down} style={styles.plusImage} />
                                    </TouchableOpacity>
                                </View>
                                {this.state.expandedIndex == index ? (
                                    this.state.title == "Bank Account" ? (
                                        <View style={styles.expanedview} >
                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Bank Account Number'
                                                style={styles.textinput}
                                                value={this.state.accountNumber}
                                                keyboardType="numeric"
                                                maxLength={12}
                                                onChangeText={(text) => {
                                                    this.setState({ accountNumber: text })
                                                    if (this.state.bankAccountNoerrMsg.length > 0) {
                                                        this.setState({ bankAccountNoerrMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ bankAccountNoerrMsg: '' }) }}
                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.bankAccountNoerrMsg ? RFValue(10) : 0 }]}>{this.state.bankAccountNoerrMsg ? this.state.bankAccountNoerrMsg : ''}</Text>
                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Bank Account Name'
                                                style={styles.textinput}
                                                value={this.state.accountName}

                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ accountName: text });
                                                    if (this.state.bankAccountnameMsg.length > 0) {
                                                        this.setState({ bankAccountnameMsg: '' })
                                                    }

                                                }}
                                                onBlur={() => { this.setState({ bankAccountnameMsg: '' }) }}

                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.bankAccountnameMsg ? RFValue(10) : 0 }]}>{this.state.bankAccountnameMsg ? this.state.bankAccountnameMsg : ''}</Text>

                                            <TouchableOpacity style={{ backgroundColor: Colors.white, marginHorizontal: RFValue(12), borderColor: 'gray', borderRadius: RFValue(6), borderBottomWidth: RFValue(1), paddingVertical: RFValue(10), paddingLeft: RFValue(5) }} onPress={() => { this.showDatePicker3(); }}>
                                                <Text style={styles.addTextStyle}>{this.state.sortCode ? this.state.sortCode : 'Sort Code'}</Text>

                                            </TouchableOpacity>

                                            <DateTimePicker
                                                isVisible={this.state.sortCodeModel}
                                                mode="date"
                                                onConfirm={(date) => this.handleConfirm3(date)}
                                                onCancel={() => this.hideDatePicker3()}

                                            />
                                            {/* <TextInput
                                                    placeholderTextColor={"#CAC9D5"}
                                                    placeholder='Sort Code'
                                                    style={styles.textinput}
                                                    value={this.state.sortCode}
                                                    keyboardType="name-phone-pad"
                                                    onChangeText={(text) => {
                                                        this.setState({ sortCode: text });
                                                        if (this.state.sortCodeMsg.length > 0) {
                                                            this.setState({ sortCodeMsg: '' })
                                                        }
                                                    }}
                                                    onBlur={() => { this.setState({ sortCodeMsg: '' }) }}

                                                /> */}
                                            <Text style={[styles.redTextStyle, { marginVertical: this.state.sortCodeMsg ? RFValue(10) : 0 }]}>{this.state.sortCodeMsg ? this.state.sortCodeMsg : ''}</Text>

                                        </View>

                                    ) : undefined) : undefined}
                                {this.state.expandedIndex == index ? (
                                    this.state.title == "Customer" ? (
                                        <View style={styles.expanedview} >
                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='First Name'
                                                style={styles.textinput}
                                                value={this.state.firstName}
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ firstName: text });
                                                    if (this.state.firstMsg.length > 0) {
                                                        this.setState({ firstMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ firstMsg: '' }) }}

                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.firstMsg ? RFValue(10) : 0 }]}>{this.state.firstMsg ? this.state.firstMsg : ''}</Text>

                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Last Name'
                                                style={styles.textinput}
                                                value={this.state.lastName}
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ lastName: text });
                                                    if (this.state.lastMsg.length > 0) {
                                                        this.setState({ lastMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ lastMsg: '' }) }}

                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.lastMsg ? RFValue(10) : 0 }]}>{this.state.lastMsg ? this.state.lastMsg : ''}</Text>

                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Phone Number'
                                                style={styles.textinput}
                                                value={this.state.phoneNo}
                                                keyboardType="phone-pad"
                                                onChangeText={(text) => {
                                                    this.setState({ phoneNo: text });
                                                    if (this.state.phoneNoMsg.length > 0) {
                                                        this.setState({ phoneNoMsg: '' })
                                                    }
                                                }}
                                                maxLength={10}
                                                onBlur={() => { this.setState({ phoneNoMsg: '' }) }}
                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.phoneNoMsg ? RFValue(10) : 0 }]}>{this.state.phoneNoMsg ? this.state.phoneNoMsg : ''}</Text>

                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Email'
                                                style={styles.textinput}
                                                value={this.state.email}
                                                keyboardType="email-address"
                                                onChangeText={(text) => {
                                                    this.setState({ email: text });
                                                    if (this.state.emailMsg.length > 0) {
                                                        this.setState({ emailMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ emailMsg: '' }) }}
                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.emailMsg ? RFValue(10) : 0 }]}>{this.state.emailMsg ? this.state.emailMsg : ''}</Text>

                                        </View>

                                    ) : undefined) : undefined}
                                {this.state.expandedIndex == index ? (
                                    this.state.title == "Address" ? (
                                        <View style={styles.expanedview} >
                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Premise'
                                                style={styles.textinput}
                                                value={this.state.premise}
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ premise: text });
                                                    if (this.state.premiseMsg.length > 0) {
                                                        this.setState({ premiseMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ premiseMsg: '' }) }}
                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.premiseMsg ? RFValue(10) : 0 }]}>{this.state.premiseMsg ? this.state.premiseMsg : ''}</Text>

                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Post Code'
                                                style={styles.textinput}
                                                value={this.state.postCode}
                                                keyboardType="name-phone-pad"
                                                maxLength={8}
                                                onChangeText={(text) => {
                                                    this.setState({ postCode: text });
                                                    if (this.state.postalMsg.length > 0) {
                                                        this.setState({ postalMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ postalMsg: '' }) }}
                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.postalMsg ? RFValue(10) : 0 }]}>{this.state.postalMsg ? this.state.postalMsg : ''}</Text>

                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='City'
                                                style={styles.textinput}
                                                value={this.state.city}
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ city: text });
                                                    if (this.state.cityMsg.length > 0) {
                                                        this.setState({ cityMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ cityMsg: '' }) }}
                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.cityMsg ? RFValue(10) : 0 }]}>{this.state.cityMsg ? this.state.cityMsg : ''}</Text>

                                            <ModalDropdown
                                                showsVerticalScrollIndicator={false}
                                                defaultValue={this.state.selectCountry}
                                                textStyle={styles.dropdownlabelStyle}
                                                ref={(ref) => {
                                                    this.modelgender = ref;
                                                }}
                                                options={this.state.country}
                                                dropdownStyle={styles.dropdownStyle}
                                                dropdownTextStyle={styles.dropdownTextStyle}
                                                onSelect={(i, value) => {
                                                    this.setState({ selectCountry: value });

                                                    if (this.state.countryMsg.length > 0) {
                                                        this.setState({ countryMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ countryMsg: '' }) }}


                                            >
                                                <View style={{ backgroundColor: Colors.white, borderColor: 'gray', marginHorizontal: RFValue(12), borderRadius: RFValue(6), borderBottomWidth: RFValue(1), paddingVertical: RFValue(10), paddingLeft: RFValue(5) }}>
                                                    <Text>{this.state.selectCountry}</Text>

                                                </View>
                                            </ModalDropdown>
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.countryMsg ? RFValue(10) : 0 }]}>{this.state.countryMsg ? this.state.countryMsg : ''}</Text>

                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Country Code'
                                                style={[styles.textinput, { marginVertical: RFValue(10) }]}
                                                value={this.state.countryCode}
                                                keyboardType="numeric"
                                                onChangeText={(text) => {
                                                    this.setState({ countryCode: text });
                                                    if (this.state.countryCodeMsg.length > 0) {
                                                        this.setState({ countryCodeMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ countryCodeMsg: '' }) }}

                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.countryCodeMsg ? RFValue(10) : 0 }]}>{this.state.countryCodeMsg ? this.state.countryCodeMsg : ''}</Text>

                                        </View>

                                    ) : undefined) : undefined}
                                {this.state.expandedIndex == index ? (
                                    this.state.title == "Documents" ? (
                                        <View style={[styles.expanedview,]} >
                                            <TouchableOpacity style={styles.documentStyle} onPress={() => { this.documentopen(); }}>
                                                <Text style={styles.documentTextStyle}>{this.state.document ? this.state.document : 'Select Document'}</Text>
                                            </TouchableOpacity>
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.documentFileMsg ? RFValue(10) : 0 }]}>{this.state.documentFileMsg ? this.state.documentFileMsg : ''}</Text>

                                            <ModalDropdown
                                                showsVerticalScrollIndicator={false}
                                                defaultValue={this.state.selectDocument}
                                                textStyle={[styles.dropdownlabelStyle, { marginLeft: RFValue(2), width: width * 0.92, }]}
                                                ref={(ref) => {
                                                    this.modeldocument = ref;
                                                }}
                                                options={this.state.documentdata}
                                                dropdownStyle={styles.dropdownStyle}
                                                dropdownTextStyle={styles.dropdownTextStyle}
                                                onSelect={(i, text) => {
                                                    this.setState({ selectDocument: text });
                                                    if (this.state.documentTypeMsg.length > 0) {
                                                        this.setState({ documentTypeMsg: '' })
                                                    }
                                                }}

                                            >
                                                <View style={{ backgroundColor: Colors.white, borderColor: 'gray', borderRadius: RFValue(6), borderBottomWidth: 1, paddingVertical: RFValue(10), paddingLeft: RFValue(5) }}>
                                                    <Text>{this.state.selectDocument}</Text>

                                                </View>
                                            </ModalDropdown>
                                            <Text style={[styles.redTextStyle, { marginVertical: this.state.documentTypeMsg ? RFValue(10) : 0 }]}>{this.state.documentTypeMsg ? this.state.documentTypeMsg : ''}</Text>

                                        </View>

                                    ) : undefined) : undefined}
                                {this.state.expandedIndex == index ? (
                                    this.state.title == "Invoice" ? (
                                        <View style={styles.expanedview} >
                                            <TouchableOpacity style={styles.invoiceStyle} onPress={() => { this.showDatePicker(); }}>
                                                <Text style={styles.documentTextStyle}>{this.state.invoiceDate ? this.state.invoiceDate : 'Invoice Date'} </Text>
                                            </TouchableOpacity>
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.invoiceDateMsg ? RFValue(5) : RFValue(-15) }]}>{this.state.invoiceDateMsg ? this.state.invoiceDateMsg : ''}</Text>

                                            <TouchableOpacity style={styles.invoiceStyle} onPress={() => { this.showDatePicker2(); }}>
                                                <Text style={styles.documentTextStyle}>{this.state.dueDate ? this.state.dueDate : 'Due Date'}</Text>
                                            </TouchableOpacity>
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.dueDateMsg ? RFValue(5) : RFValue(-15) }]}>{this.state.dueDateMsg ? this.state.dueDateMsg : ''}</Text>

                                            <DateTimePicker
                                                isVisible={this.state.invoiceDateModel}
                                                mode="date"
                                                onConfirm={(date) => this.handleConfirm(date)}
                                                onCancel={() => this.hideDatePicker()}
                                                minimumDate={this.state.currentDate}
                                            />
                                            <DateTimePicker
                                                isVisible={this.state.dueDateModel}
                                                mode="date"
                                                onConfirm={(date) => this.handleConfirm2(date)}
                                                onCancel={() => this.hideDatePicker2()}
                                                minimumDate={this.state.currentDate}

                                            />
                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Invoice Description'
                                                style={styles.textinput}
                                                value={this.state.invoiceDescription}
                                                multiline={true}
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ invoiceDescription: text });
                                                    if (this.state.invoiceDMsg.length > 0) {
                                                        this.setState({ invoiceDMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ invoiceDMsg: '' }) }}

                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.invoiceDMsg ? RFValue(10) : 0 }]}>{this.state.invoiceDMsg ? this.state.invoiceDMsg : ''}</Text>

                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Invoice Currency'
                                                style={styles.textinput}
                                                value={this.state.currency}
                                                maxLength={3}
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ currency: text });
                                                    if (this.state.invoiceCurrencyMsg.length > 0) {
                                                        this.setState({ invoiceCurrencyMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ invoiceCurrencyMsg: '' }) }}

                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.invoiceCurrencyMsg ? RFValue(10) : 0 }]}>{this.state.invoiceCurrencyMsg ? this.state.invoiceCurrencyMsg : ''}</Text>

                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Invoice Number'
                                                style={styles.textinput}
                                                value={this.state.invoiceNumber}
                                                maxLength={8}
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ invoiceNumber: text });
                                                    if (this.state.invoiceNoMsg.length > 0) {
                                                        this.setState({ invoiceNoMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ invoiceNoMsg: '' }) }}
                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.invoiceNoMsg ? RFValue(10) : 0 }]}>{this.state.invoiceNoMsg ? this.state.invoiceNoMsg : ''}</Text>

                                        </View>

                                    ) : undefined) : undefined}
                                {this.state.expandedIndex == index ? (
                                    this.state.title == "Extensions" ? (
                                        <ScrollView style={styles.expanedview} >
                                            <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: RFValue(10) }} onPress={() => { this.addExtensions(); }}>
                                                <Text style={styles.addTextStyle}>Add</Text>
                                                <Image source={plus} style={styles.plusImage2} />
                                            </TouchableOpacity>
                                            {this.state.extensions.map((item, i) => {

                                                return (
                                                    <View style={{ marginTop: RFValue(5) }}>
                                                        <View style={[styles.flexrow]}>
                                                            <Text style={styles.indexStyle}>{i + 1}</Text>
                                                            <TouchableOpacity style={{ marginTop: RFValue(5), marginRight: RFValue(15) }} onPress={() => { this.removeExtensions(i); }}>
                                                                <Image source={minus} style={styles.plusImage2} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <TextInput
                                                            placeholderTextColor={"#CAC9D5"}
                                                            placeholder='Extension Name'
                                                            style={styles.textinput}
                                                            value={this.state.extensions[item]}
                                                            keyboardType="default"

                                                            onChangeText={(text) => { this.state.extensions[i].name = text; }}
                                                        />
                                                        <TextInput
                                                            placeholderTextColor={"#CAC9D5"}
                                                            placeholder='Extension Amount'
                                                            style={styles.textinput}
                                                            value={this.state.extensions[item]}

                                                            keyboardType="numeric"
                                                            onChangeText={(text) => { console.log(this.state.extensions); this.state.extensions[i].value = text; }}

                                                        />
                                                        <ModalDropdown
                                                            showsVerticalScrollIndicator={false}
                                                            defaultValue={this.state.extensions[i].type ? this.state.extensions[i].type : 'Extension Type'}
                                                            textStyle={styles.dropdownlabelStyle}
                                                            ref={(ref) => {
                                                                this.modelgender = ref;
                                                            }}
                                                            options={this.state.ExtensionType}
                                                            dropdownStyle={[styles.dropdownStyle, { height: RFValue(80) }]}
                                                            dropdownTextStyle={styles.dropdownTextStyle}
                                                            onSelect={(is, value) => {
                                                                let data = []
                                                                data = this.state.extensions;
                                                                data[i].type = value;
                                                                this.setState({ extensions: data });
                                                                // console.log("exas->",this.state.extensions);
                                                            }}

                                                        >
                                                            <View style={{ marginVertical: RFValue(10), backgroundColor: Colors.white, borderColor: 'gray', marginHorizontal: RFValue(12), borderRadius: RFValue(6), borderBottomWidth: 1, paddingVertical: RFValue(12), paddingLeft: RFValue(8) }}>
                                                                <Text>{this.state.extensions[i].type ? this.state.extensions[i].type : 'Extension Type'}</Text>

                                                            </View>
                                                        </ModalDropdown>
                                                        <View style={{ marginLeft: RFValue(12), marginTop: RFValue(10) }}>
                                                            <Text style={styles.DeductlabelStyle} >Deduct Type</Text>
                                                            <View style={[styles.flexrow, { marginTop: RFValue(10), marginHorizontal: RFValue(50) }]}>
                                                                <View style={{ flexDirection: 'row' }}>

                                                                    <Text style={styles.DeductlabelStyle} >ADD</Text>
                                                                    <TouchableOpacity style={{ marginLeft: RFValue(8), width: RFValue(20), height: RFValue(20), borderWidth: RFValue(1), borderRadius: RFValue(12) }} onPress={() => { let data = []; data = this.state.extensions; data[i].deductType = 'Add'; this.setState({ extensions: data }) }} >
                                                                        {this.state.extensions[i].deductType == 'Add' ? (<View style={{ marginTop: RFValue(3), width: RFValue(12), height: RFValue(12), alignSelf: 'center', backgroundColor: Colors.black, borderRadius: RFValue(12) }} />) : <View />}
                                                                    </TouchableOpacity>

                                                                </View>
                                                                <View style={{ flexDirection: 'row' }}>

                                                                    <Text style={styles.DeductlabelStyle} >Deduct</Text>

                                                                    <TouchableOpacity style={{ marginLeft: RFValue(8), width: RFValue(20), height: RFValue(20), borderWidth: RFValue(1), borderRadius: RFValue(12) }} onPress={() => { let data = []; data = this.state.extensions; data[i].deductType = 'Deduct'; this.setState({ extensions: data }); }} >
                                                                        {this.state.extensions[i].deductType == 'Deduct' ? (<View style={{ marginTop: RFValue(3), width: RFValue(12), height: RFValue(12), alignSelf: 'center', backgroundColor: Colors.black, borderRadius: RFValue(12) }} />) : <View />}
                                                                    </TouchableOpacity>

                                                                </View>

                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </ScrollView>

                                    ) : undefined) : undefined}
                                {this.state.expandedIndex == index ? (
                                    this.state.title == "Items" ? (
                                        <View style={[styles.expanedview]} >
                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Item Name'
                                                style={styles.textinput}
                                                value={this.state.itemName}
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ itemName: text });
                                                    if (this.state.itemNameMsg.length > 0) {
                                                        this.setState({ itemNameMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ itemNameMsg: '' }) }}
                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.itemNameMsg ? RFValue(10) : 0 }]}>{this.state.itemNameMsg ? this.state.itemNameMsg : ''}</Text>

                                            <TextInput
                                                placeholderTextColor={"#CAC9D5"}
                                                placeholder='Item Description'
                                                style={styles.textinput}
                                                value={this.state.itemDescription}
                                                multiline={true}
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    this.setState({ itemDescription: text });
                                                    if (this.state.itemDMsg.length > 0) {
                                                        this.setState({ itemDMsg: '' })
                                                    }
                                                }}
                                                onBlur={() => { this.setState({ itemDMsg: '' }) }}
                                            />
                                            <Text style={[styles.redTextStyle, { marginBottom: this.state.itemDMsg ? RFValue(10) : 0 }]}>{this.state.itemDMsg ? this.state.itemDMsg : ''}</Text>
                                            <View style={{ marginLeft: RFValue(15), flexDirection: 'row' }}>

                                                <Text style={[styles.addTextStyle, { marginLeft: RFValue(4), alignSelf: 'center' }]}>Extensions</Text>
                                            </View>

                                            <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: RFValue(10) }} onPress={() => { this.additemExtensions(); }}>
                                                <Text style={styles.addTextStyle}>Add</Text>
                                                <Image source={plus} style={styles.plusImage2} />
                                            </TouchableOpacity>
                                            {this.state.itemExtensions.map((item, i) => {

                                                return (
                                                    <View style={{ marginTop: RFValue(5) }}>
                                                        <View style={[styles.flexrow]}>
                                                            <Text style={styles.indexStyle}>{i + 1}</Text>
                                                            <TouchableOpacity style={{ marginTop: RFValue(5), marginRight: RFValue(15) }} onPress={() => { this.removeitemExtensions(i); }}>
                                                                <Image source={minus} style={styles.plusImage2} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <TextInput
                                                            placeholderTextColor={"#CAC9D5"}
                                                            placeholder='Item Extension Name'
                                                            style={styles.textinput}
                                                            value={this.state.itemExtensions[item]}
                                                            keyboardType="default"

                                                            onChangeText={(text) => { this.state.itemExtensions[i].name = text; }}
                                                        />
                                                        <TextInput
                                                            placeholderTextColor={"#CAC9D5"}
                                                            placeholder='Item Extension Amount'
                                                            style={styles.textinput}
                                                            value={this.state.itemExtensions[item]}

                                                            keyboardType="numeric"
                                                            onChangeText={(text) => { console.log(this.state.itemExtensions); this.state.itemExtensions[i].value = text; }}

                                                        />
                                                        <ModalDropdown
                                                            showsVerticalScrollIndicator={false}
                                                            defaultValue={this.state.itemExtensions[i].type ? this.state.itemExtensions[i].type : 'Item Extension Type'}
                                                            textStyle={styles.dropdownlabelStyle}
                                                            ref={(ref) => {
                                                                this.modelgender = ref;
                                                            }}
                                                            options={this.state.ExtensionType}
                                                            dropdownStyle={[styles.dropdownStyle, { height: RFValue(80) }]}
                                                            dropdownTextStyle={styles.dropdownTextStyle}
                                                            onSelect={(is, value) => {
                                                                let data = []
                                                                data = this.state.itemExtensions;
                                                                this.state.itemExtensions[i].type = value;
                                                                this.setState({ itemExtensions: data });
                                                            }}

                                                        >
                                                            <View style={{ marginVertical: RFValue(10), backgroundColor: Colors.white, borderColor: 'gray', marginHorizontal: RFValue(12), borderRadius: RFValue(6), borderBottomWidth: 1, paddingVertical: RFValue(12), paddingLeft: RFValue(8) }}>
                                                                <Text>{this.state.itemExtensions[i].type ? this.state.itemExtensions[i].type : 'Item Extension Type'}</Text>

                                                            </View>
                                                        </ModalDropdown>
                                                        <View style={{ marginLeft: RFValue(12), marginTop: RFValue(10) }}>
                                                            <Text style={styles.DeductlabelStyle} >Item Deduct Type</Text>
                                                            <View style={[styles.flexrow, { marginTop: RFValue(10), marginHorizontal: RFValue(50) }]}>
                                                                <View style={{ flexDirection: 'row' }}>

                                                                    <Text style={styles.DeductlabelStyle} >ADD</Text>
                                                                    <TouchableOpacity style={{ marginLeft: RFValue(8), width: RFValue(20), height: RFValue(20), borderWidth: 1, borderRadius: RFValue(12) }} onPress={() => { let data = []; data = this.state.itemExtensions; data[i].deductType = 'Add'; this.setState({ itemExtensions: data }) }} >
                                                                        {this.state.itemExtensions[i].deductType == 'Add' ? (<View style={{ marginTop: RFValue(3), width: RFValue(12), height: RFValue(12), alignSelf: 'center', backgroundColor: Colors.black, borderRadius: RFValue(12) }} />) : <View />}
                                                                    </TouchableOpacity>

                                                                </View>
                                                                <View style={{ flexDirection: 'row' }}>

                                                                    <Text style={styles.DeductlabelStyle} >Deduct</Text>

                                                                    <TouchableOpacity style={{ marginLeft: RFValue(8), width: RFValue(20), height: RFValue(20), borderWidth: 1, borderRadius: RFValue(12) }} onPress={() => { let data = []; data = this.state.itemExtensions; data[i].deductType = 'Deduct'; this.setState({ itemExtensions: data }); }} >
                                                                        {this.state.itemExtensions[i].deductType == 'Deduct' ? (<View style={{ marginTop: RFValue(3), width: RFValue(12), height: RFValue(12), alignSelf: 'center', backgroundColor: Colors.black, borderRadius: RFValue(12) }} />) : <View />}
                                                                    </TouchableOpacity>

                                                                </View>

                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>

                                    ) : undefined) : undefined}
                            </>
                        )
                    })}
                </ScrollView>
                <TouchableOpacity style={{ marginBottom: RFValue(10), backgroundColor: Colors.gray, paddingVertical: RFValue(12), borderRadius: RFValue(8), marginHorizontal: RFValue(25) }} onPress={() => { this.onSubmit() }}>
                    <Text style={{ color: Colors.white, alignSelf: 'center', fontSize: RFValue(16), fontFamily: Fonts.Medium }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
        paddingHorizontal: RFValue(10),
        
    },
    main: {
        
        marginTop: RFValue(10),
      
    },
    dropdownlabelStyle: {
        fontSize: RFValue(14),
        color: Colors.black,
        marginLeft: RFValue(12),
        paddingLeft: RFValue(8),
        marginTop: RFValue(8),
        paddingVertical: RFValue(8),
        backgroundColor: Colors.white,
        width: width * 0.86,
        // paddingHorizontal: width * 0.56,
        borderRadius: RFValue(6),
    },
    dropdownStyle: {
        marginLeft: RFValue(15),
        marginTop: RFValue(15),
        height: RFValue(150),
        width: width * 0.85,

    },
    dropdownTextStyle: {
        fontSize: RFValue(12),
        color: Colors.gray,

    },
    redTextStyle: {
        marginLeft: RFValue(12),
        fontFamily: Fonts.Medium,
        fontSize: RFValue(12),
        color: Colors.red,
    },
    textinput: {
        fontFamily: Fonts.Medium,
        fontSize: RFValue(14),
        color: Colors.black,
        borderBottomWidth: RFValue(1),
        borderBottomLeftRadius: RFValue(6),
        borderColor: 'gray',
        borderRadius: RFValue(6),
        marginHorizontal: RFValue(12),
        paddingVertical: RFValue(10),
        paddingLeft: RFValue(10),
        // backgroundColor: '',
        marginVertical: RFValue(5),
    },
    invoiceStyle: {
        backgroundColor: Colors.white,
        marginVertical: RFValue(10),
        marginHorizontal: RFValue(12),
        paddingVertical: RFValue(10),
        borderRadius: RFValue(6),
        borderBottomWidth: RFValue(1),
        borderColor: 'gray',
    },

    documentStyle: {
        backgroundColor: Colors.white,
        marginVertical: RFValue(10),
        paddingVertical: RFValue(12),
        borderRadius: RFValue(6),
        borderBottomWidth: RFValue(0.5),
        borderColor: 'gray',
    },
    documentTextStyle: {
        paddingLeft: RFValue(8),
        fontFamily: Fonts.RobotoRegular,
        fontSize: RFValue(12),
        color: Colors.black,
    },
    DeductlabelStyle: {
        fontFamily: Fonts.RobotoRegular,
        fontSize: RFValue(14),
        color: Colors.black,
    },
    addTextStyle: {
        marginRight: RFValue(4),
        fontFamily: Fonts.RobotoRegular,
        fontSize: RFValue(12),
        color: Colors.black,
    },
    indexStyle: {
        marginLeft: RFValue(12),
        fontFamily: Fonts.RobotoRegular,
        fontSize: RFValue(14),
        color: Colors.black,
        marginBottom: RFValue(5)
    },
    title: {
        fontFamily: Fonts.Medium,
        fontSize: RFValue(24),
        color: Colors.black,
        marginLeft: RFValue(3),
        marginTop: RFValue(5),
    },
    expanedview: {
        marginVertical: RFValue(10),
    },
    label: {
        fontFamily: Fonts.Medium,
        fontSize: RFValue(16),
        color: Colors.black,
        marginLeft: RFValue(3),
        marginTop: RFValue(5),
    },
    flexrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageStyle: {
        alignSelf: 'center',

    },
    plusImage: {
        width: RFValue(18),
        height: RFValue(18),
        resizeMode: 'contain'
    },
    plusImage2: {
        width: RFValue(12),
        height: RFValue(12),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
})