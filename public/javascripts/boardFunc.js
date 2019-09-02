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

$(".post-more").on('click', function(e){
    let $postBoard = $(".post-board")
    let postCnt = $postBoard.children().length
    console.log(postCnt)
    $.ajax({
        url : window.location.href + "/more/" + postCnt,
        method : "GET",
        dataType : "json"
    })
    .done((json) => {
        console.log(json)
        if(postCnt != 0){
            if(json.length !== 0){
                for(let i =0;i<json.length;i++){
                    let {
                        likeMember,
                        postComment,
                        postContent,
                        postTags,
                        postTitle,
                        postWriter,
                        postWriterNick,
                        writeDate,
                        _id : id
                    } = json[i]
                    let $clone = $postBoard.children().eq(0).clone()
                    $clone.find(".post-writer").text(postWriter)
                    $clone.find(".post-writerNick").text(postWriterNick)
                    $clone.find(".post-writeDate").text(writeDate)
                    $clone.find(".post-title").text(postTitle)
                    $clone.find(".post-content").text(postContent)
                    $clone.find(".like-cnt").text("Like "+likeMember.length)
                    let $hashTags = $clone.find(".hashTags").empty()
                    for(let tagIdx = 0; tagIdx<postTags.length; postTags++){
                        let tag = $("<span class='badge badge-primary'>"+ postTags[tagIdx] +"</span>")
                        $hashTags.append(tag)
                    }
                    $clone.find(".comment-cnt").text("Comment "+postComment.length)
                    let $comments = $clone.find(".post-comments").empty()
                    for(let commentIdx = 0; commentIdx < postComment.length ; commentIdx++){
                        let $comment = $('<div class="d-flex justify-content-between align-items-center pt-10 pb-10 border-bottom row"><div class="col-lg-4"><img src="https://picsum.photos/30/30"class="rounded-circle"><div class="h7 m-0 comment-master ml-1"><b class="comment-writer"></b></div></div><div class="col-lg-8 comment-content"></div></div>')
                        $comment.find(".comment-writer").text("@"+postComment[commentIdx].commentWriter)
                        $comment.find(".comment-content").text(postComment[commentIdx].commentContent)
                        $comments.append($comment)
                    }
                    $clone.find(".createComment").attr("target", id)
                    $postBoard.append($clone)
                }
            }else{
                $(".post-more").text("Failed.. More..")
            }
        }else{
            $(".post-more").text("Failed.. More..")
        }
        //$postBoard.append()
    })
    .fail(() => {
        $(".post-more").text("Failed.. More..")
    })

})

$(".createComment").on('click', function(e){
    let id = $(this).attr('target')
    let comment = $(this).parents(".comment-form").children().eq(0).val()
    if(comment){
        $.ajax({
            url : window.location.href + '/comment/createComment',
            data : { comment : comment, id : id },
            method : "POST",
            dataType : "json",
        })
        .done((data) => {
            console.log(data)
            let $comment = $('<div class="d-flex justify-content-between align-items-center pt-10 pb-10 border-bottom row"><div class="col-lg-4"><img src="https://picsum.photos/30/30"class="rounded-circle"><div class="h7 m-0 comment-master ml-1"><b class="comment-writer"></b></div></div><div class="col-lg-8 comment-content"></div></div>')
            $comment.find(".comment-writer").text("@"+ data.commentWriter)
            $comment.find(".comment-content").text(data.commentContent)
            $(this).parents(".post-comments").prepend($comment)
        })
        .fail((xhr, status, errorThrown) => {
            console.log("Failed ....")
        })
    }else{
        alert("Please Input Comment..")
    }
})
