
$(document).ready(()=>{
  $("#getWeights").click(()=>{
    $.ajax({
      url:"/getWeight",
      method:"post",
      data:{'email':email,'name':name},
      success:function(res){
        console.log(res);
      }
    });
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