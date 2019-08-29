String.prototype.onlyFirstUpper = function(){
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

$('.hash-tag-input').on('focusout', function(e){
    let temp = $(this).val()
    temp = temp.split("#")
    temp.shift()
    let target = $(".hashTags")
    target.children().remove()
    temp.forEach((item, idx) => {
        target.append($('<span class="badge badge-primary mr-2"></span>').text(item.onlyFirstUpper()))
    })
})