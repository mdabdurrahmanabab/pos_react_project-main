import React from 'react';
import Modal from 'react-bootstrap/Modal';

function CategoryPhotoModal(props) {
  return (
	<>
		<Modal
      {...props}
      size={props.size}
      aria-labelledby="category-details-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="category-details-modal">
          {props.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className={'table-responsive'}>
          <table className={'my-table table table-hover table-striped table-bordered'}>
            <tbody>
                <tr>
                  <th>ID</th>
                  <td>{props.category.id}</td>
                </tr>
                <tr>
                  <th>Serial</th>
                  <td>{props.category.serial}</td>
                </tr>
                {
                  props.category.category_name != undefined ?
                  <tr>
                    <th>Category</th>
                    <td>{props.category.category_name}</td>
                  </tr>:null
                }
                <tr>
                  <th>Name</th>
                  <td>{props.category.name}</td>
                </tr>
                <tr>
                  <th>Slug</th>
                  <td>{props.category.slug}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{props.category.description}</td>
                </tr>
                <tr>
                  <th>Create By</th>
                  <td>{props.category.created_by}</td>
                </tr>
                <tr>
                  <th>Create At</th>
                  <td>{props.category.created_at}</td>
                </tr>
                <tr>
                  <th>Update At</th>
                  <td>{props.category.updated_at}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{props.category.status}</td>
                </tr>
                <tr>
                  <th>Photo</th>
                  <td><img src={props.category.photo} alt={'Category photo'} width={'50%'}/></td>
                </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>

    </Modal>

	</>
  );
}

export default CategoryPhotoModal;