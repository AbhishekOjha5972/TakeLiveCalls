import {useDispatch} from "react-redux"
import { postEventAction } from "../../redux/events/event.actions"


const FormComponent = () => {
    const dispatch = useDispatch()

    const handleCreateEvent = (e) => {
        e.preventDefault()
        let form = e.target;
        console.log('form:', form.eventName)
        let obj ={
            "nameOfEvent":form.eventName.value,
            "shortDescription":form.shortDescription.value,
            "startTime":form.startTime.value,
            "endTime":form.endTime.value,
            "limit":form.limit.value,
            "country":form.country.value,
            "state":form.state.value
        }
        dispatch(postEventAction(obj))
        alert("New Event Added.")
    }

    return (
        <form onSubmit={handleCreateEvent}>
            <div className='std-label-input'>
                <label className='std-label'>Event Name</label>
                <input className='std-input' type='text' id='eventName' required/>
            </div>
            <div className='std-label-input'>
                <label className='std-label'>Short Description</label>
                <textarea className='std-input' type='text' id='shortDescription' required></textarea>
            </div>
            <div className='std-label-input'>
                <label className='std-label'>Start Time</label>
                <input className='std-input' type='date' id='startTime'  required/>
            </div>
            <div className='std-label-input'>
                <label className='std-label'>End Time</label>
                <input className='std-input' type='date' id='endTime'  required/>
            </div>
            <div className='std-label-input'>
                <label className='std-label'>Limit</label>
                <input className='std-input' type='number' id='limit'  required/>
            </div>
            <div className='std-label-input'>
                <label className='std-label'>State</label>
                <input className='std-input' type='text' id='state'  required/>
            </div>
            <div className='std-label-input'>
                <label className='std-label'>Country</label>
                <input className='std-input' type='text' id='country'  required/>
            </div>
            <input type='submit' className='std-btn'/>
        </form>
    )
}

export default FormComponent