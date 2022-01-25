<template>
  <div class="tableTcontent">
    <div class="table_top">
      <a-date-picker @change="onChange" :allowClear="false" placeholder="选择开始日期" />
      <a-button style="margin-left:20px;" type="primary" @click="replaceMent">回到当前</a-button>
    </div>
    <!-- style="pointer-events: none;" -->
    <!-- table-layout="fixed" -->
    <div class="table_main">
      <table border="1">
        <thead>
          <tr>
            <td colspan="15">
              <span>市民服务中心导办台周度轮值表</span>
              <span style="padding-left:20px;">
                <a-button type="primary" @click="handleSave">保存此周期排班</a-button>
              </span>
            </td>
          </tr>
        </thead>
        <tbody>
          <!-- 时间行 -->
          <tr>
            <td rowspan="2">值班地点</td>
            <td colspan="2" class="headerDate" v-for="d in reportDates" :key="d">{{ d }}</td>
          </tr>
          <!-- 延时服务行 -->
          <tr>
            <template v-for="(item,Zindex) in reportDates">
              <td :key="item">{{ getDayOfWeekOfDate(item) }}</td>
              <td :key="Zindex">延时服务</td>
            </template>
          </tr>
          <!-- 地点行 -->
          <tr v-for="(item,index) in registerSite" :key="index">
            <td>{{item.title}}</td>
            <template v-for="(i,v) in reportDates.length">
              <!-- 正常值班的循环 -->
              <td :key="i" @click.stop="handleReceive(index,v,'1')" class="padding_td">
                <a-tag
                  v-for="(p ,pindex) in personInfo[index+''+v+'1']"
                  :key="pindex"
                  closable
                  visible
                  color="#2db7f5"
                  @close.stop="closeTag(p,index,v,'1')"
                >{{ setValue(p) }}</a-tag>
              </td>
              <!-- 延时值班的循环 -->
              <td :key="Math.random()+v" @click.stop="handleReceive(index,v,'2')" class="padding_td">
                <a-tag
                  v-for="(p ,pindex) in personInfo[index+''+v+'2']"
                  :key="pindex"
                  closable
                  visible
                  color="#2db7f5"
                  @close.stop="closeTag(p,index,v,'2')"
                >{{ setValue(p) }}</a-tag>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import { schedulingSave, getScheduling } from '@/api/Scheduling'
import { format } from 'path'
import JDate from '@/components/jeecg/JDate'
export default {
  components: {
    JDate
  },
  data() {
    return {
      // dateFormat: 'YYYY-MM-DD',
      //   reportDateSelectOptions: {
      //   disabledDate: function(date) {
      //     return date && date.valueOf() < Date.now() - 86400000;
      //   }
      // },
      reportDates: [],
      reportBeginDate: new Date(),
      registerSite: [],
      personInfo: {},
      newPersonList: [],
      postIdList: []
    }
  },

  methods: {
    replaceMent() {
      this.$message.warn('切换日期前请保存当前排班，否则数据丢失')
      this.reportBeginDate = new Date()
      this.getReportDatesArray()
      this.getScheduling()
    },
    onChange(date, dateString) {
      this.$message.warn('切换日期前请保存当前排班，否则数据丢失')
      this.reportBeginDate = dateString
      this.getReportDatesArray()
      this.getScheduling()
      let dateCurrent = this.DateUtil.format(new Date(), 'yyyy-MM-dd')
      // this.reportDates.map((v, i) => {
      //   if (v < dateCurrent) {

      //   }
      // })
    },
    // 获取排班表
    getScheduling() {
      let params = {
        postIdList: JSON.stringify(this.postIdList),
        beginDate: this.reportDates[0],
        endDate: this.reportDates[6]
      }
      getScheduling(params).then(res => {
        var newObj = {}
        res.data.forEach((v, i) => {
          let rowIndex = v.postId - 1
          let colIndex = this.reportDates.indexOf(v.reportDate)
          let number = v.teamRole
          let key = rowIndex + '' + colIndex + number
          let personId = v.personId
          let personName = v.personName
          let postId = v.postId
          let postName = v.postName
          let teamRole = v.teamRole
          let teamRoleName = v.teamRoleName
          let reportDate = v.reportDate
          let objItem = { postId, postName, teamRole, teamRoleName, personId, personName, reportDate }
          if (!newObj[key]) {
            this.$set(newObj, key, [])
          }
          newObj[key].push(objItem)
        })
        this.personInfo = newObj
        // console.log(this.personInfo, '获取的personInfo')
      })
    },
    // 保存排班表
    handleSave() {
      let newArr = []
      for (const key in this.personInfo) {
        if (this.personInfo.hasOwnProperty(key)) {
          newArr.push(this.personInfo[key])
        }
      }
      let newPersonList = []
      newArr.map(function(value, index, array) {
        newPersonList = newPersonList.concat(value)
      })

      // let params = {postIdList:JSON.stringify(this.postIdList),reportDates:JSON.stringify(this.reportDates),reportWatchVOList:JSON.stringify(this.newPersonList)}
      // debugger
      schedulingSave(JSON.stringify(this.postIdList), JSON.stringify(this.reportDates), JSON.stringify(newPersonList))
        .then(res => {
          if (res.flag) {
            // console.log(this.personInfo, '保存的personInfo')
            this.$message.success('保存成功')
          }
        })
        .catch(err => {
          this.$message.error('保存失败，请重新保存')
        })
    },
    setValue(item) {
      return item.personName
    },
    closeTag(p, rowIndex, colIndx, number) {
      let itemStore = this.$store.state.scheduling.personListItem
      let key = rowIndex + '' + colIndx + number
      // console.log(this.personInfo[key], '删除前')
      this.personInfo[key].forEach((item, index) => {
        if (p.personId === item.personId) {
          this.personInfo[key].splice(index, 1)
          //  console.log(this.personInfo[key],'删除后')
        }
      })

    },
    // 点击显示排班人员
    handleReceive(rowIndex, colIndx, number) {
      let item = this.$store.state.scheduling.personListItem
      let key = rowIndex + '' + colIndx + number
      if (JSON.stringify(item) == '{}') {
        return
      }
      if (!this.personInfo[key]) {
        this.$set(this.personInfo, key, [])
      }
      this.personInfo[key].filter((v, i) => {
        if (v.personId === item.personId) {
          this.personInfo[key].splice(i, 1)
        }
      })
      // 在这里添加登记地点和时间和是否临时服务的标识给每个item再push
      let teamRoleName = number == 1 ? '正常值班' : '延时值班'
      let teamRole = number
      let postId = this.registerSite[rowIndex].value
      let postName = this.registerSite[rowIndex].title
      let reportDate = this.reportDates[colIndx]
      let itemNew = {
        personId: item.personId,
        personName: item.personName,
        postId,
        postName,
        reportDate,
        teamRole,
        teamRoleName
      }
      this.personInfo[key].push(itemNew)
      // console.log(this.personInfo, '点击显示的personInfo')
    },

    // 获取报备日期列表
    getReportDatesArray() {
      this.reportDates = []
      let d = new Date(this.reportBeginDate)
      this.reportDates.push(this.DateUtil.format(d, 'yyyy-MM-dd'))
      for (let i = 0; i < 6; i++) {
        d.setDate(d.getDate() + 1)
        this.reportDates.push(this.DateUtil.format(d, 'yyyy-MM-dd'))
      }
    },
    // 获取报备日期星期几
    getDayOfWeekOfDate(dateStr) {
      let date = new Date(dateStr)
      return '星期' + this.DateUtil.dayOfWeekArr[date.getDay()]
    },
    // 获取登记地点数据字典
    initDictOptions() {
      let dictCode = 'REGISTRATION_SITE'
      initDictOptions(dictCode).then(res => {
        if (res.success && res.code == 0) {
          this.registerSite = res.result
        }
        // 获取导办台主键
        this.registerSite.map((v, i) => {
          this.postIdList.push(v.value)
          return this.postIdList
        })
        this.getScheduling()
      })
    },
    // 表格初始化
    initWin() {
      this.getReportDatesArray()
      this.initDictOptions()
    }
  },
  mounted() {
    this.initWin()
  }
}
</script>

<style lang='less' scoped>
.tableTcontent {
  .table_top {
    margin: 0 0 10px 15px;
  }
  .table_main {
    overflow: scroll;
    overflow-y: hidden;
    //  overflow:auto;
    // display: block;
    table {
      width: 1000px;
      border: 1px solid #595959;
      // min-width: 100%;
      // table-layout: fixed;
      // border-collapse: collapse;
      // background-color: transparent;
      // table-layout:fixed;
      // word-break:break-all;
      tr {
        text-align: center;
      }
      td {
        height: 50px;
         min-width: 100px;
      }
      td:nth-child(-n + 1) {
        height: 50px;
      }
      .padding_td{
        // min-height: 200px;
        padding-bottom: 20px;
        height: 100px;
      }
      // .td_content{
      //   width: 90px;
      // }
      // .address{
      //   width: 50px;
      // }
    }
  }
}
/deep/ .ant-tag {
  margin: 5px 10px;
  display: block;
  width: auto;
}
/deep/ .ant-calendar-picker {
  width: 35%;
}
</style>