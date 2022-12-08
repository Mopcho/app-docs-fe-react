import React, { useState, useEffect } from "react";
import { Modal } from "../../../base-components/modal";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useService from "../../../service";

export default function show({ addLabelModal, onClose }) {
  const [form, setForm] = useState({
    title : '',
    color : '#ffffff'
  });

  const {service} = useService();

  function onChange(ev) {
    const value = ev.target.value;
    const name = ev.target.name;

    const newFrom = {
      ...form,
      [name] : value
    }

    setForm(oldForm => newFrom)
  }

  const {mutate, isError, error} = useMutation(async (data)=> {
    if(!data.color) {
      throw new Error('Please select a color');
    }
    const response = await service.create("labels", data);

    onClose();
  });
  return (
    <Modal show={addLabelModal} onHidden={() => onClose()} >
      <form className="p-[20px] flex-col flex justify-around" onSubmit={(ev) => {
        ev.preventDefault();
        mutate(form);
      }}>
        <label htmlFor="label-name" className="my-3">
            Label Name
        
        <input
          name="title"
          id="label-name"
          type="text"
          className="form-control"
          placeholder="Label name"
          value={form.title}
          onChange={onChange}
        />
        </label>

        <label htmlFor="label-color" className="my-3">
            Label Color
        <input 
        type="color" 
        name="color" 
        id="label-color" 
        className="block"
        value={form.color}
        onChange={onChange}
        />
        </label>
      <div className="my-3">
        <button className="btn btn-primary w-24 mr-1 mb-2">Add Label</button>
      </div>
      </form>
    </Modal>
  );
}
