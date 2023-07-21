// import https from '@/common/lib/request'
import { post, get } from '@/apiData/request'
const api = {
  config_api: '/multi/'
}
interface apiData {
  data: object,
  config: any
}
const index_api = {  //index
  supplier_shop_option(data: apiData, config: apiData) { //mock测试接口
    return post("supplier_admin_api/data_overview_head", data, config);
  },


}


export default {
  ...index_api,

}
