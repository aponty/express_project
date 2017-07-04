$(() => {
    console.log('script linked')
    $('.topic-select-enter').on('click', e => {
        e.preventDefault();
        //to expand, would need to make this dynamic
        const topic = $('option').eq(0).val();

        $.ajax({
            method: 'PUT',
            url: '/addusertopic',
            data: { topic },
            success: res => window.location.replace(`/resources/${topic}`)
        })
    });

    $('.new-note').on('submit', e => {
        e.preventDefault();
        const topic = $('option').eq(0).val();
        const note = $('textarea').val();

        $.ajax({
            method: 'POST',
            url: '/notes',
            data: { topic, note },
            success: res => {
                window.location.replace('/notes')
            }
        })
    });

    document.querySelectorAll('.delete').forEach(el => {
        const val = el.value;
        el.addEventListener('click', () => {
            $.ajax({
                method: 'DELETE',
                url: '/notes',
                data: { val },
                success: res => location.reload()
            })
        })
    });

    $('.insomnia.event').on('click', el => {
        el.preventDefault();
        const data = el.target.value;
        console.log(data)
        $.ajax({
            method: "POST",
            url: '/events',
            data: { data },
            success: res => location.reload()
        })
    });

    $('.new-comment').on('submit', e => {
        e.preventDefault();
        //would need to be variablized
        const topic = 'insomnia';
        const comment = $('textarea').val()

        $.ajax({
            method: 'POST',
            url: '/forum',
            data: { topic, comment },
            success: res => {
                location.reload();
            }
        })
    })

//not done with these routes, going to have to do jquery
//nonsense to get comments to append to the parent comment
//since mustache is basic for that sort of thing
    $('.reply').one('click', e => {
        const parentComment = $('.reply:focus').attr('data-value')
        let replyBox = $('<form class="reply-form"><textarea></textarea placeholder="respond away"><button type="submit">Submit</button><form>')
        $('.reply:focus').append(replyBox)
        replyBox.on('submit', e => {
            e.preventDefault();
            const comment = $('.reply-form>textarea').val()
            const topic = 'insomnia'
            $.ajax({
                method: 'POST',
                url: '/forum/reply',
                data: { topic, comment, parentComment },
                success: res => {
                    console.log('back in forum ajax', res)
                }
            })
        })
    })

    //jquery
})
