$(()=>{
    console.log('linked')

    $('.topic-select-enter').on('click', e=> {
        e.preventDefault();
        //to expand, would need to make this dynamic
        const topic = $('option').eq(0).val()

        $.ajax({
            method: 'PUT',
            url: '/addusertopic',
            data: { topic },
            success: res => {
                window.location.replace(`/resources/${topic}`)
            }
        })
    })

})
