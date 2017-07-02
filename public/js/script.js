$(() => {
    console.log('linked')
    console.log(moment().dayOfYear())

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
    })

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
    })


    //
    // $('.container').on('click', el => {
    //     el.preventDefault();
    //     console.log('container')
    //     $.ajax({
    //         method: "GET",
    //         url: 'https://data.import.io/extractor/7fd58f2f-690d-487c-a780-6f60367869be/json/latest?_apikey=ccdbd8b9876f4d2baf79a9f29698c20d9f78c56ce91822fda50cfe9586269a58c359724bb375e81e8bf646848d60ab83139a8857812f734d446b71b5b73870c49c8f6091b240ba3c7a47693c22ac68e2',
    //         success: data => console.log(data)
    //     })
    // })





    //jquery
})
