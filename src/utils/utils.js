

export default {
    formateDate(time){
        if(!time) return '';
        let date=new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    pagination(data,callback){//通过点击下一页触发callback回调一个函数
        return{
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal:()=>{//用于显示数据总量和当前数据顺序
                return `共${data.result.total}条`
            },
            showQuickJumper	:true//是否可以快速跳转至某页
        }
        
    }
}