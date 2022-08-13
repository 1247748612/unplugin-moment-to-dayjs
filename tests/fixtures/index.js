import moment from 'moment'

export default function hello() {
  moment.locale('zh-cn')

  moment('2019-01-01')
}
