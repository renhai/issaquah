package com.renhai.manage.repository;

import com.renhai.manage.entity.Tester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by hai on 6/26/17.
 */
@Repository
public interface PSCTesterRepository extends JpaRepository<Tester, Integer> {
}
