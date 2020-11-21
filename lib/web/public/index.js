
$(document).ready(()=>{
  getWeight();

  let currDate=new Date();
  let dateString=currDate.getFullYear()+"-"+(currDate.getMonth()+1)+"-"+currDate.getDate();
  $('#datePicker').val(dateString);

  function getWeight(){
    $.ajax({
      url:"/getWeight",
      method:"post",
      data:{'email':email,'name':name},
      success:function(res){
        console.log(res);
        createTable(res);
        createChart(res);
      }
    });
  }
  function createTable(weights){
    $("#weights").append("<thead class='thead-dark'><th>Date</th><th>Weight</th></thead>");
    weights.forEach(w => {
        $("#weights").append("<tr><td>"+w.date+"</td><td>"+w.weight+"</td></tr>"); //clear table first
    });
  }
  function createChart(data){
    let keys=[];
    let values=[];
    data.forEach(element => {
        keys.push(element.date);
        values.push(element.weight);
    });
    let myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels:keys,
        datasets:[{
          label:"Your weight",
          data:values,
          backgroundColor: [
            'rgba(0, 0, 0, 0.1)'
          ],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Weight'
            }
          }],
          xAxes:[{ 
            scaleLabel: {
            display: true,
            labelString: 'Date'
          }}]
        },    
      }
  });
  }

  $("#addWeight").click(()=>{
    let date=$('#datePicker').val();
    let weight=$("#weight").val();
    if(weight!=undefined){
      $.ajax({
        url:"/addWeight",
        method:"POST",
        data:{'email':email,'name':name, 'weight':weight, 'date':date},
        success:function(res){
          console.log(res);
          getWeight()
        }
      });
    }
    
  });
  $("#logout").click(()=>{
    $.ajax({
      url:"/logout",
      method:"POST",
      success:function(res){
        window.location.href=res;
      }
    });
  });
});