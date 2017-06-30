$(()=>{
    console.log('linked')

    $('.topic-select-enter').on('click', e => {
        e.preventDefault();
        //to expand, would need to make this dynamic
        const topic = $('option').eq(0).val();

        $.ajax({
            method: 'PUT',
            url: '/addusertopic',
            data: { topic },
            success: res => {
                window.location.replace(`/resources/${topic}`)
            }
        })
    })

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
    })

    document.querySelectorAll('.delete').forEach(x => {
        const val = x.value;
        x.addEventListener('click', () => {
            $.ajax({
                method: 'DELETE',
                url: '/notes',
                data: { val },
                success: res => {
                    location.reload()
                }
            })
        })
    })






















    //jquery
})
