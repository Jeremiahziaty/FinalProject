/**
 * Created by jeremiah on 9/25/2016.
 */


function CalculateRevenue()
{
    const Revenue = 20/100;
    var txtADPriceTicket;
    var txtADTickSold;
    var txtCHPriceTicket;
    var txtChTicketSold;

    var divADGrossTicketAmount;
    var divCHGrossTickAmount;
    var divTotalGross;
    var divADNetTicketAmount;
    var divCHNetticketAmount;
    var divTotalNet;

    var txtADPriceTicket = parseFloat(document.getElementById("txtADPriceTicket").value);
    var txtADTickSold = parseFloat(document.getElementById("txtADTickSold").value);
    var txtCHPriceTicket = parseFloat(document.getElementById("txtCHPriceTicket").value);
    var txtChTicketSold = parseFloat(document.getElementById("txtChTicketSold").value);
    var divGrossAmount = parseFloat(document.getElementById("divGrossAmount").value)

    var divADGrossTicketAmount = txtADPriceTicket * txtADTickSold;
    document.getElementById("divADGrossTicketAmount").innerHTML = "$"+ divADGrossTicketAmount.toFixed(2);
    var divCHGrossTickAmount = txtCHPriceTicket * txtChTicketSold;
    document.getElementById("divCHGrossTickAmount").innerHTML = divCHGrossTickAmount.toFixed(2);
    var divTotalGross = txtADPriceTicket * txtADTickSold + txtCHPriceTicket * txtChTicketSold;
    document.getElementById("divTotalGross").innerHTML = "$"+ divTotalGross.toFixed(2);
    var divADNetTicketAmount = txtADPriceTicket * txtADTickSold * Revenue;
    document.getElementById("divADNetTicketAmount").innerHTML = "$"+divADNetTicketAmount.toFixed(2);
    var divCHNetticketAmount = txtCHPriceTicket *  txtChTicketSold * Revenue;
    document.getElementById("divCHNetticketAmount").innerHTML = "$"+divCHNetticketAmount.toFixed(2);
    var divTotalNet = txtADPriceTicket * txtADTickSold*Revenue + txtCHPriceTicket *  txtChTicketSold* Revenue;
    document.getElementById("divTotalNet").innerHTML ="$"+divTotalNet.toFixed(2)

    var divGrossAmount = divTotalGross/(txtADTickSold + txtChTicketSold);
    document.getElementById("divGrossAmount").innerHTML = "$"+ divGrossAmount.toFixed(2);
    var divNetAmount = divTotalNet/ (txtADTickSold + txtChTicketSold)
    document.getElementById("divNetAmount").innerHTML = "$"+divNetAmount.toFixed(2);

    debugger;
}
function ClearForm()
{
    document.getElementById("txtADPriceTicket").value="";
    document.getElementById("txtADTickSold").value="";
    document.getElementById("txtCHPriceTicket").value="";
    document.getElementById("txtChTicketSold").value="";
    document.getElementById("divGrossAmount").innerHTML="";
    document.getElementById("divTotalNet").innerHTML="";
    document.getElementById("divADGrossTicketAmount").innerHTML="";
    document.getElementById("divCHGrossTickAmount").innerHTML="";
    document.getElementById("divTotalGross").innerHTML="";
    document.getElementById("divADNetTicketAmount").innerHTML="";
    document.getElementById("divCHNetticketAmount").innerHTML="";
    document.getElementById("divNetAmount").innerHTML="";
}