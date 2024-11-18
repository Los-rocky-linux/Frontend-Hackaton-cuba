import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  GroupDisplay,
  Enrollment,
  Member,
  Tutor,
} from '../../../../../../core/interfaces/group.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalService } from '../../../../../../core/services/boostrap-modal.service';
import { Subscription } from 'rxjs';

interface MemberEnrollment {
  member: Member;
  enrollment: Enrollment;
}

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent implements OnInit, OnDestroy {
  public groupData!: GroupDisplay;
  public memberEnrollments: MemberEnrollment[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    public activeModal: NgbActiveModal,
    private _bsModalService: BootstrapModalService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this._bsModalService.getDataIssued().subscribe((data) => {
        console.log('Received data from modal service:', data);
        if (data) {
          this.groupData = data;
          console.log('Group data assigned:', this.groupData);
          this.mapMembersToEnrollments();
        } else {
          console.error('Group data not received');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // Mapea cada miembro con su inscripción correspondiente
  mapMembersToEnrollments(): void {
    this.memberEnrollments = this.groupData.members.map((member) => {
      const enrollment = this.groupData.enrollments.find(
        (enroll) => enroll.createdBy._id === member._id
      );
      return { member, enrollment: enrollment! };
    });
  }

  // Formatear tutores para cada inscripción
  formatTutors(tutors: Tutor[]): string {
    const tutorNames = tutors.map((tutor) => tutor.name.trim());
    const uniqueTutors = Array.from(new Set(tutorNames));
    return uniqueTutors.join(', ') || 'N/A';
  }

  // Formatear miembros
  formatMembers(members: Member[]): string {
    return (
      members.map((member) => `${member.name} ${member.lastName}`).join(', ') ||
      'N/A'
    );
  }

  formatPartner(enrollment: any): string {
    return enrollment.partner
      ? `${enrollment.partner.name} ${enrollment.partner.lastName}`
      : 'N/A';
  }

  closeModal(): void {
    this.activeModal.dismiss();
    // this._bsModalService.updateModalClosed(true);
  }
}