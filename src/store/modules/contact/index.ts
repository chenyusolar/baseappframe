import { defineStore } from 'pinia'
interface ContactInfo {
    id: number,
    contact: string,
    firstname:string,
    lastname: string,
    nickname:string,
    oldname: string,
    relateship:string,
    title:string,
    sex: string,
    birthday:string,
    position: string,
    company: string,
    companyaddinfo:string,
    companyaddress:string,
    companycity:string,
    companystate:string,
    companycountry:string,
    companyzip:string,
    homeaddinfo:string,
    homeaddress:string,
    homecity:string,
    homestate:string,
    homecountry:string,
    homezip:string,
    businessstatus:string,
    phone:string,
    phone2:string,
    email:string,
    email2:string,
    wechat:string,
    qq:string,
    dingtalk:string,
    emergency_contact:string,
    emergency_phone:string
}

export const useContactInfo = defineStore("contactinfo",{
    state(){
        return {
            id:0,
            contact: '联系人',
            firstname:'名字',
            lastname: '姓',
            nickname:'昵称',
            oldname: '曾用名',
            relateship:'关系',
            title:'职业',
            sex: '性别',
            birthday:"生日",
            position: '职位',
            company: '公司',
            companyaddinfo:'公司地址',
            companyaddress:'公司地址',
            companycity:'城市',
            companystate:'省州',
            companycountry:'国家',
            companyzip:'邮编',
            homeaddinfo:'家庭住址',
            homeaddress:'家庭住址',
            homecity:'城市',
            homestate:'省州',
            homecountry:'国家',
            homezip:'邮编',
            businessstatus:'业务关系',
            phone:'主要电话',
            phone2:'辅助电话',
            email:'主要邮件',
            email2:'辅助邮件',
            wechat:'微信',
            qq:'QQ',
            dingtalk:'钉钉',
            emergency_contact:'紧急联系人',
            emergency_phone:'紧急联系电话'
        }
    },
    getters: {},
    actions: {
        setuid(id:number) {
            this.id = id;
        },
        setuname(name:string) {
            this.contact = name;
        },
    },
    persist: {
        enabled: true,
    },
})

export const useContactList = defineStore("contactlist",{
    state(){
        return {
            list:[]
        }
    },
    getters: {},
    actions: {
        init(data:[]){
            this.list = [];
            console.log("Store-contactlist:data");
            console.log(data);
            for(let i=0; i < data.length;i++){
                this.list[i] = data[i];
            }
        }
    },
    persist: {
        enabled: true,
    },
})

